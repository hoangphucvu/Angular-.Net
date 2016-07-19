using AngularForMVC.Models;
using System;
using System.Collections.Generic;
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
    }
}