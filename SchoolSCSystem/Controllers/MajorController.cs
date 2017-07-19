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
    public class MajorController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        public int GetMajorsNum()
        {
            return db.Major.Count();
        }
        //根据当前页面获取专业
        [HttpGet]
        public IQueryable<Major> GetMajorsByPage(int page, int pageSize)
        {
            return db.Major
                .OrderBy(u => u.MajorId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取班级
        public IQueryable<Major> GetMajorsBySearch(string searchString)
        {
            return db.Major.Where(u => u.MajorName.Contains(searchString));
        }
        // GET api/Major
        public IQueryable<Major> GetMajors()
        {
            return db.Major;
        }

        // GET api/Major/5
        [ResponseType(typeof(Major))]
        public IHttpActionResult GetMajor(int id)
        {
            Major major = db.Major.Find(id);
            if (major == null)
            {
                return NotFound();
            }

            return Ok(major);
        }

        // PUT api/Major/5
        public IHttpActionResult PutMajor(int id, Major major)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != major.MajorId)
            {
                return BadRequest();
            }

            db.Entry(major).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MajorExists(id))
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

        // POST api/Major
        [ResponseType(typeof(Major))]
        public IHttpActionResult PostMajor(Major major)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Major.Add(major);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MajorExists(major.MajorId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = major.MajorId }, major);
        }

        // DELETE api/Major/5
        [ResponseType(typeof(Major))]
        public IHttpActionResult DeleteMajor(int id)
        {
            Major major = db.Major.Find(id);
            if (major == null)
            {
                return NotFound();
            }

            db.Major.Remove(major);
            db.SaveChanges();

            return Ok(major);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MajorExists(int id)
        {
            return db.Major.Count(e => e.MajorId == id) > 0;
        }
    }
}