using System.Web.Mvc;

namespace AngularWithNetMVC.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        [Authorize]
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
    }
}