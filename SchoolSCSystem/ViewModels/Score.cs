using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSCSystem.ViewModels
{
    public class ScorePro
    {
        public int ScoreId { get; set; }
        public int StudentId { get; set; }
        public string StudentName{get;set;}
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public int Score { get; set; }
    }
}