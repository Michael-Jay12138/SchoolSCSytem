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
    public class StudentController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        public int[] GetObjectsNum()
        {
            int[] arr = new int[6];
            arr[0] = db.Teacher.Count();
            arr[1] = db.Class.Count();
            arr[2] = db.Student.Count();
            arr[3] = db.User.Count();
            arr[4] = db.Major.Count();
            arr[5] = db.Course.Count();
            return arr;
        }
        //获取学生总数
        public int GetStudentsNum()
        {
            return db.Student.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public List<SchoolSCSystem.ViewModels.StudentPro> GetStudentsByPage(int page, int pageSize)
        {
            List<Student> StudentList = db.Student
               .OrderBy(u => u.StudentId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList();

            List<SchoolSCSystem.ViewModels.StudentPro> StudentProList = new List<ViewModels.StudentPro>();
            for (int i = 0; i < StudentList.Count(); i++)
            {
                SchoolSCSystem.ViewModels.StudentPro studentpro = new ViewModels.StudentPro();
                studentpro.StudentId = StudentList[i].StudentId;
                studentpro.StudentName = StudentList[i].StudentName;
                studentpro.StudentEmail = StudentList[i].StudentEmail;
                studentpro.ClassId = StudentList[i].ClassId;
                studentpro.MajorId = StudentList[i].MajorId;
                studentpro.ClassName = db.Class.Find(StudentList[i].ClassId).ClassName;
                studentpro.MajorName = db.Major.Find(StudentList[i].MajorId).MajorName;
                StudentProList.Add(studentpro);
            }
            return StudentProList;
        }
        //根据搜索词获取用户
        public IQueryable<Student> GetStudentsBySearch(string searchString)
        {
            return db.Student.Where(u => u.StudentName.Contains(searchString));
        }
        // GET: api/Teachers
        public IQueryable<Student> GetStudent()
        {
            return db.Student;
        }

        // GET: api/Students/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult GetStudent(int id)
        {
            Student student = db.Student.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            SchoolSCSystem.ViewModels.StudentPro studentpro = new ViewModels.StudentPro();
            studentpro.StudentId = student.StudentId;
            studentpro.StudentName = student.StudentName;
            studentpro.StudentEmail = student.StudentEmail;
            studentpro.ClassId = student.ClassId;
            studentpro.MajorId = student.MajorId;
            studentpro.ClassName = db.Class.Find(student.ClassId).ClassName;
            studentpro.MajorName = db.Major.Find(student.MajorId).MajorName;


            return Ok(studentpro);

        }

        // PUT: api/Students/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStudent(int id, Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.StudentId)
            {
                return BadRequest();
            }

            db.Entry(student).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        // POST: api/Students
        [ResponseType(typeof(Student))]
        public IHttpActionResult PostStudent(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Student.Add(student);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (StudentExists(student.StudentId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = student.StudentId }, student);
        }

        // DELETE: api/Students/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult DeleteStudent(int id)
        {
            Student student = db.Student.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            db.Student.Remove(student);
            db.SaveChanges();

            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentExists(int id)
        {
            return db.Student.Count(e => e.StudentId == id) > 0;
        }
    }
}