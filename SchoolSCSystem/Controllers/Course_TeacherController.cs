using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SchoolSCSystem.Models;

namespace SchoolSCSystem.Controllers
{
    public class Course_TeacherController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetCourse_TeachersNum()
        {
            return db.Course_Teacher.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public List<SchoolSCSystem.ViewModels.Course_TeacherPro> GetCourse_TeachersByPage(int page, int pageSize)
        {
            List<Course_Teacher> CourseTeacherList = db.Course_Teacher
                .OrderBy(u => u.CourseId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList();

            List<SchoolSCSystem.ViewModels.Course_TeacherPro> Course_TeacherProList = new List<ViewModels.Course_TeacherPro>();

            for (int i = 0; i < CourseTeacherList.Count(); i++)
            {
                SchoolSCSystem.ViewModels.Course_TeacherPro courseteacherpro = new ViewModels.Course_TeacherPro();
                courseteacherpro.CourseId = CourseTeacherList[i].CourseId;
                courseteacherpro.TeacherId = CourseTeacherList[i].TeacherId;
                courseteacherpro.CourseName = db.Course.Find(CourseTeacherList[i].CourseId).CourseName;
                courseteacherpro.TeacherName = db.Teacher.Find(CourseTeacherList[i].TeacherId).TeacherName;
                Course_TeacherProList.Add(courseteacherpro);
            }
            return Course_TeacherProList;
        }
        //根据搜索词获取用户
        public IQueryable<Course_Teacher> GetCourse_TeachersBySearch(string searchString)
        {
            return db.Course_Teacher.Where(u => u.CourseId.ToString().Contains(searchString));
        }

        // GET: api/Course_Teacher
        public IQueryable<Course_Teacher> GetCourse_Teachers()
        {
            return db.Course_Teacher;
        }

        // GET: api/Course_Teacher/5
        [ResponseType(typeof(Course_Teacher))]
        public IHttpActionResult GetCourse_Teacher(int courseid,int teacherid)
        {
            Course_Teacher course_teacher = db.Course_Teacher.Where(ct=>ct.CourseId==courseid).Where(ct=> ct.TeacherId ==teacherid).SingleOrDefault();
            if (course_teacher == null)
            {
                return NotFound();
            }

            return Ok(course_teacher);
        }

        // PUT: api/Course_Teacher/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCourse_Teacher(int courseid, int teacherid,string course_teacher)
        {
            Course_Teacher course_teacherupd = Newtonsoft.Json.JsonConvert.DeserializeObject<Course_Teacher>(course_teacher);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            Course_Teacher course_teacherbf = db.Course_Teacher.Where(ct => ct.CourseId == courseid).Where(ct => ct.TeacherId == teacherid).SingleOrDefault();
            db.Entry(course_teacherbf).State = EntityState.Deleted;
            db.Course_Teacher.Add(course_teacherupd);
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
               
                    throw;
                
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Course_Teacher
        [ResponseType(typeof(Course_Teacher))]
        public IHttpActionResult PostCourse_Teacher(Course_Teacher course_teacher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Course_Teacher.Add(course_teacher);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Course_TeacherExists(course_teacher.CourseId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = course_teacher.CourseId }, course_teacher);
        }

        // DELETE: api/Course_Teacher/5
        [ResponseType(typeof(Course_Teacher))]
        public IHttpActionResult DeleteCourse_Teacher(int courseid,int teacherid)
        {
            Course_Teacher course_teacher = db.Course_Teacher.Where(ct => ct.CourseId == courseid).Where(ct => ct.TeacherId == teacherid).SingleOrDefault();
            if (course_teacher == null)
            {
                return NotFound();
            }

            db.Course_Teacher.Remove(course_teacher);
            db.SaveChanges();

            return Ok(course_teacher);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Course_TeacherExists(int id)
        {
            return db.Course_Teacher.Count(e => e.CourseId == id) > 0;
        }
    }
}