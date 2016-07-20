using AngularForMVC.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularForMVC.Controllers
{
    public class DataController : Controller
    {
        // GET: Data
        public JsonResult GetLastContact()
        {
            Contacts contact = null;
            using (MyDatabaseEntities dc = new MyDatabaseEntities())
            {
                contact = dc.Contacts.OrderByDescending(a => a.ContactID).Take(1).FirstOrDefault();
            }
            return new JsonResult { Data = contact, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult UserLogin(LoginData data)
        {
            using (MyDatabaseEntities dc = new MyDatabaseEntities())
            {
                var user = dc.User.Where(a => a.Username.Equals(data.Username)
                && a.Password.Equals(data.Password)).FirstOrDefault();
                return new JsonResult { Data = user, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult GetEmployeeList()
        {
            List<Employees> employee = new List<Employees>();
            using (MyDatabaseEntities dc = new MyDatabaseEntities())
            {
                employee = dc.Employees.OrderBy(a => a.FirstName).ToList();
            }
            return new JsonResult { Data = employee, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetCountries()
        {
            List<Country> allCountry = new List<Country>();
            using (MyDatabaseEntities dc = new MyDatabaseEntities())
            {
                allCountry = dc.Country.OrderBy(a => a.CountryName).ToList();
            }
            return new JsonResult { Data = allCountry, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetStates(int countryID)
        {
            List<State> allStates = new List<State>();
            using (MyDatabaseEntities dc = new MyDatabaseEntities())
            {
                allStates = dc.State.Where(a => a.CountryID.Equals(countryID)).OrderBy(a => a.StateName).ToList();
            }
            return new JsonResult { Data = allStates, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult Register(User user)
        {
            string message = string.Empty;
            if (ModelState.IsValid)
            {
                using (MyDatabaseEntities dc = new MyDatabaseEntities())
                {
                    var userExits = dc.User.Where(u => u.Username.Equals(user.Username)).FirstOrDefault();
                    if (userExits == null)
                    {
                        dc.User.Add(user);
                        dc.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Username not available!";
                    }
                }
            }
            else
            {
                message = "Model state is not valid!";
            }

            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult UpFile()
        {
            string message, fileName, actualFileName;
            message = fileName = actualFileName = string.Empty;
            bool flag = false;
            if (Request.Files != null)
            {
                var file = Request.Files[0];
                actualFileName = file.FileName;
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;
                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"), fileName));
                    UploadFile f = new UploadFile
                    {
                        FileName = actualFileName,
                        FilePath = fileName,
                        FileSize = size
                    };
                    using (MyDatabaseEntities dc = new MyDatabaseEntities())
                    {
                        dc.UploadFile.Add(f);
                        dc.SaveChanges();
                        message = "File uploaded successfully";
                        flag = true;
                    }
                }
                catch
                {
                    message = "File upload failed! Please try again";
                }
            }
            return new JsonResult { Data = new { Message = message, Status = flag } };
        }
    }
}