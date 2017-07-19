using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSCSystem.ViewModels
{
    public class StudentPro
    {
        public int StudentId { get; set; }
        public Nullable<int> MajorId { get; set; }
        public Nullable<int> ClassId { get; set; }
        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public string ClassName { get; set; }
        public string MajorName { get; set; }
    }
}