using System.Web;
using System.Web.Optimization;

namespace AngularWithNetMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/AngularWithNet")
           .IncludeDirectory("~/Scripts/Controllers", "*.js")
           .IncludeDirectory("~/Scripts/Factories", "*.js")
           .Include("~/Scripts/script.js"));

            //BundleTable.EnableOptimizations = true;
        }
    }
}