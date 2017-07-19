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
    public class ClassController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        public int GetClassesNum()
        {
            return db.Class.Count();
        }
        //根据当前页面获取班级
        [HttpGet]
        public IQueryable<Class> GetClassesByPage(int page, int pageSize)
        {
            return db.Class
                .OrderBy(u => u.ClassId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取班级
        public IQueryable<Class> GetClassesBySearch(string searchString)
        {
            return db.Class.Where(u => u.ClassName.Contains(searchString));
        }
        // GET api/Class
        public IQueryable<Class> GetClasses()
        {
            return db.Class;
        }

        // GET api/Class/5
        [ResponseType(typeof(Class))]
        public IHttpActionResult GetClass(int id)
        {
            Class @class = db.Class.Find(id);
            if (@class == null)
            {
                return NotFound();
            }

            return Ok(@class);
        }

        // PUT api/Class/5
        public IHttpActionResult PutClass(int id, Class @class)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != @class.ClassId)
            {
                return BadRequest();
            }

            db.Entry(@class).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassExists(id))
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

        // POST api/Class
        [ResponseType(typeof(Class))]
        public IHttpActionResult PostClass(Class @class)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Class.Add(@class);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ClassExists(@class.ClassId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = @class.ClassId }, @class);
        }

        // DELETE api/Class/5
        [ResponseType(typeof(Class))]
        public IHttpActionResult DeleteClass(int id)
        {
            Class @class = db.Class.Find(id);
            if (@class == null)
            {
                return NotFound();
            }

            db.Class.Remove(@class);
            db.SaveChanges();

            return Ok(@class);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassExists(int id)
        {
            return db.Class.Count(e => e.ClassId == id) > 0;
        }
    }
}