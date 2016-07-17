using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularWithNetMVC.Startup))]
namespace AngularWithNetMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
