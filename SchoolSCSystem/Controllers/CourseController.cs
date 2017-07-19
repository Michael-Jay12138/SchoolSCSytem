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
    public class CourseController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetCoursesNum()
        {
            return db.Course.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public IQueryable<Course> GetCoursesByPage(int page, int pageSize)
        {
            return db.Course
                .OrderBy(u => u.CourseId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取用户
        public IQueryable<Course> GetCoursesBySearch(string searchString)
        {
            return db.Course.Where(u => u.CourseName.Contains(searchString));
        }
        // GET: api/Course
        public IQueryable<Course> GetCourses()
        {
            return db.Course;
        }

        // GET: api/Course/5
        [ResponseType(typeof(Course))]
        public IHttpActionResult GetCourse(int id)
        {
            Course course = db.Course.Find(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        // PUT: api/Course/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCourse(int id, Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != course.CourseId)
            {
                return BadRequest();
            }

            db.Entry(course).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Course
        [ResponseType(typeof(Course))]
        public IHttpActionResult PostCourse(Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Course.Add(course);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CourseExists(course.CourseId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = course.CourseId }, course);
        }

        // DELETE: api/Course/5
        [ResponseType(typeof(Course))]
        public IHttpActionResult DeleteCourse(int id)
        {
            Course course = db.Course.Find(id);
            if (course == null)
            {
                return NotFound();
            }

            db.Course.Remove(course);
            db.SaveChanges();

            return Ok(course);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CourseExists(int id)
        {
            return db.Course.Count(e => e.CourseId == id) > 0;
        }
    }
}