using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSCSystem.ViewModels
{
    public class ApprovalDataPro
    {
        public int DataId { get; set; }
        public int UserId { get; set; }
        public int FlowId { get; set; }
        public int Step { get; set; }
        public string State { get; set; }
        public int CreatorId { get; set; }
        public string ApprovalType { get; set; }
        public Nullable<int> SelectCourseId { get; set; }
        public Nullable<int> SelectLeaveId { get; set; }
        public Nullable<int> SelectClassRoomId { get; set; }
        public string FlowName { get; set; }
        public string CreatorName { get; set; }
        public string UserName { get; set; }

    }
}