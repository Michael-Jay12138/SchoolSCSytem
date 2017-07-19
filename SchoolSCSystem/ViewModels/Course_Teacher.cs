using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSCSystem.ViewModels
{
    public class Course_TeacherPro
    {
        public int CourseId { get; set; }
        public int TeacherId { get; set; }
        public string CourseName { get; set; }
        public string TeacherName { get; set; }
    }
}