using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSCSystem.ViewModels
{
    public class MenuPro
    {
        public int MenuId { get; set; }
        public string ParentName { get; set; }
        public int ParentId { get; set; }
        public string MenuName { get; set; }
        public string State { get; set; }
        public string PageUrl { get; set; }
        public string Icon { get; set; }
        public Nullable<int> MenuLevel { get; set; }
    }
}