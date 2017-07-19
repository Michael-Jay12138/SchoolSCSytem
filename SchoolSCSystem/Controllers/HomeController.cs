using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolSCSystem.Models;

namespace SchoolSCSystem.Controllers
{
    public class HomeController : Controller
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //快速查找用于首页提示搜索
        public ActionResult QuickSearch(string table, string term)
        {
            switch (table)
            {
                case "student":
                    var lists1 = GetStudents(term).Select(a => new { value = a.StudentName });
                    return Json(lists1, JsonRequestBehavior.AllowGet);
                case "teacher":
                    var lists2 = GetNormalTeachers(term).Select(a => new { value = a.TeacherName });
                    return Json(lists2, JsonRequestBehavior.AllowGet);
                case "class":
                    var lists3 = GetClasses(term).Select(a => new { value = a.ClassName });
                    return Json(lists3, JsonRequestBehavior.AllowGet);
                case "course":
                    var lists4 = GetCourses(term).Select(a => new { value = a.CourseName });
                    return Json(lists4, JsonRequestBehavior.AllowGet);
                case "major":
                    var lists5 = GetMajors(term).Select(a => new { value = a.MajorName });
                    return Json(lists5, JsonRequestBehavior.AllowGet);
                case "classroom":
                    var lists6 = GetClassRooms(term).Select(a => new { value = a.ClassRoomName });
                    return Json(lists6, JsonRequestBehavior.AllowGet);
            }
            var lists = GetStudents(term).Select(a => new { value = a.StudentName });
            return Json(lists, JsonRequestBehavior.AllowGet);
        }
        public List<Student> GetStudents(string searchString)
        {
            return db.Student.Where(a => a.StudentName.Contains(searchString)).ToList();
        }
        public List<Class> GetClasses(string searchString)
        {
            return db.Class.Where(a => a.ClassName.Contains(searchString)).ToList();
        }
        public List<Teacher> GetNormalTeachers(string searchString)
        {
            return db.Teacher.Where(a => a.TeacherName.Contains(searchString)).ToList();
        }
        public List<Course> GetCourses(string searchString)
        {
            return db.Course.Where(a => a.CourseName.Contains(searchString)).ToList();
        }
        public List<Major> GetMajors(string searchString)
        {
            return db.Major.Where(a => a.MajorName.Contains(searchString)).ToList();
        }
        public List<ClassRoom> GetClassRooms(string searchString)
        {
            return db.ClassRoom.Where(a => a.ClassRoomName.Contains(searchString)).ToList();
        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult User()
        {
            ViewBag.Title = "User";
            return View();
        }
        public ActionResult Role()
        {
            ViewBag.Title = "Role";
            return View();
        }
        public ActionResult Menu()
        {
            ViewBag.Title = "Menu";
            return View();
        }
        public ActionResult Role_Menu()
        {
            ViewBag.Title = "Role_Menu";
            return View();
        }
        public ActionResult User_Role()
        {
            ViewBag.Title = "User_Role";
            return View();
        }
        public ActionResult ApprovalNode_User()
        {
            ViewBag.Title = "ApprovalNode_User";
            return View();
        }
        public ActionResult Course_Teacher()
        {
            ViewBag.Title = "Course_Teacher";
            return View();
        }
        public ActionResult Teacher()
        {
            ViewBag.Title = "Teacher";
            return View();
        }
        public ActionResult Student()
        {
            ViewBag.Title = "Student";
            return View();
        }
        public ActionResult ApprovalProcess()
        {
            ViewBag.Title = "ApprovalProcess";
            return View();
        }
        public ActionResult ApprovalData()
        {
            ViewBag.Title = "ApprovalData";
            return View();
        }
        public ActionResult Course()
        {
            ViewBag.Title = "Course";
            return View();
        }
        public ActionResult Score()
        {
            ViewBag.Title = "Score";
            return View();
        }
        public ActionResult ApprovalNode()
        {
            ViewBag.Title = "ApprovalNode";
            return View();
        }
        public ActionResult Log()
        {
            ViewBag.Title = "Log";
            return View();
        }
        public ActionResult Class()
        {
            ViewBag.Title = "Class";
            return View();
        }
        public ActionResult Major()
        {
            ViewBag.Title = "Major";
            return View();
        }
        public ActionResult ClassRoom()
        {
            ViewBag.Title = "ClassRoom";
            return View();
        }
        public ActionResult Leave()
        {
            ViewBag.Title = "Leave";
            return View();
        }
        public ActionResult ClassRoom_User()
        {
            ViewBag.Title = "ClassRoom_User";
            return View();
        }
    }
}
