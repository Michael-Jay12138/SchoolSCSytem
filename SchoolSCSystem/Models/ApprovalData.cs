//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace SchoolSCSystem.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ApprovalData
    {
        public Nullable<int> UserId { get; set; }
        public string State { get; set; }
        public int Step { get; set; }
        public int FlowId { get; set; }
        public int CreatorId { get; set; }
        public Nullable<int> SelectCourseId { get; set; }
        public int DataId { get; set; }
        public string ApprovalType { get; set; }
        public Nullable<int> SelectLeaveId { get; set; }
        public Nullable<int> SelectClassRoomId { get; set; }
    }
}
