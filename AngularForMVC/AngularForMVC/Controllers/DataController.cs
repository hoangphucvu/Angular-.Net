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
    }
}