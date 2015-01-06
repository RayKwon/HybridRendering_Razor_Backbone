using HybridRendering_Razor_Backbone.Helpers;
using HybridRendering_Razor_Backbone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HybridRendering_Razor_Backbone.Controllers
{
    public class HomeController : Controller
    {
        private List<User> _users;

        public HomeController()
        {
            if (_users == null)
            {
                _users = new List<User>();
                _users.Add(new User { Id = 1, Name="Jay", Suburb="Clayton" });
                _users.Add(new User { Id = 2, Name = "Sujin", Suburb = "Camberwell" });
                _users.Add(new User { Id = 3, Name = "Uyoung", Suburb = "Melbourne" });
            }
        }

        [Route("~/")]
        public ActionResult Index()
        {
            if (!Request.IsAjaxRequest())
            {
                return View();
            }
            else
            {
                var viewAsString = RazorViewHelper.RenderAsString(this, "Index", null);
                return Json(new { view = viewAsString }, JsonRequestBehavior.AllowGet);
            }            
        }

        [Route("~/users")]
        public ActionResult Users()
        {
            if (!Request.IsAjaxRequest())
            {
                return View(_users);
            }
            else
            {
                var viewAsString = RazorViewHelper.RenderAsString(this, "Users", _users);
                return Json(new { view = viewAsString, model = _users }, JsonRequestBehavior.AllowGet);
            }            
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}