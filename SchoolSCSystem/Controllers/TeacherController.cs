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
    public class TeacherController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetTeachersNum()
        {
            return db.Teacher.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public IQueryable<Teacher> GetTeachersByPage(int page, int pageSize)
        {
            return db.Teacher
                .OrderBy(u => u.TeacherId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取用户
        public IQueryable<Teacher> GetTeachersBySearch(string searchString)
        {
            return db.Teacher.Where(u => u.TeacherName.Contains(searchString));
        }
        // GET: api/Teachers
        public IQueryable<Teacher> GetTeacher()
        {
            return db.Teacher;
        }

        // GET: api/Teachers/5
        [ResponseType(typeof(Teacher))]
        public IHttpActionResult GetTeacher(int id)
        {
            Teacher teacher = db.Teacher.Find(id);
            if (teacher == null)
            {
                return NotFound();
            }

            return Ok(teacher);
        }

        // PUT: api/Teachers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTeacher(int id, Teacher teacher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != teacher.TeacherId)
            {
                return BadRequest();
            }

            db.Entry(teacher).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
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

        // POST: api/Teachers
        [ResponseType(typeof(Teacher))]
        public IHttpActionResult PostTeacher(Teacher teacher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Teacher.Add(teacher);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TeacherExists(teacher.TeacherId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = teacher.TeacherId }, teacher);
        }

        // DELETE: api/Teachers/5
        [ResponseType(typeof(Teacher))]
        public IHttpActionResult DeleteTeacher(int id)
        {
            Teacher teacher = db.Teacher.Find(id);
            if (teacher == null)
            {
                return NotFound();
            }

            db.Teacher.Remove(teacher);
            db.SaveChanges();

            return Ok(teacher);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TeacherExists(int id)
        {
            return db.Teacher.Count(e => e.TeacherId == id) > 0;
        }
    }
}