using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSCSystem.ViewModels
{
    public class ClassRoom_UserPro
    {
        public int ClassRoomId { get; set; }
        public int UserId { get; set; }
        public string ClassRoomName { get; set; }
        public string UserName { get; set; }
    }
}