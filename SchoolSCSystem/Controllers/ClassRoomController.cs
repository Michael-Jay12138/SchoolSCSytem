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
    public class ClassRoomController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetClassRoomsNum()
        {
            return db.ClassRoom.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public IQueryable<ClassRoom> GetClassRoomsByPage(int page, int pageSize)
        {
            return db.ClassRoom
                .OrderBy(u => u.ClassRoomId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取用户
        public IQueryable<ClassRoom> GetClassRoomsBySearch(string searchString)
        {
            return db.ClassRoom.Where(u => u.ClassRoomName.Contains(searchString));
        }
        // GET: api/ClassRoom
        public IQueryable<ClassRoom> GetClassRooms()
        {
            return db.ClassRoom;
        }

        // GET: api/ClassRoom/5
        [ResponseType(typeof(ClassRoom))]
        public IHttpActionResult GetClassRoom(int id)
        {
            ClassRoom classroom = db.ClassRoom.Find(id);
            if (classroom == null)
            {
                return NotFound();
            }

            return Ok(classroom);
        }

        // PUT: api/ClassRoom/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClassRoom(int id, ClassRoom classroom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != classroom.ClassRoomId)
            {
                return BadRequest();
            }

            db.Entry(classroom).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassRoomExists(id))
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

        // POST: api/ClassRoom
        [ResponseType(typeof(ClassRoom))]
        public IHttpActionResult PostClassRoom(ClassRoom classroom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClassRoom.Add(classroom);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ClassRoomExists(classroom.ClassRoomId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = classroom.ClassRoomId }, classroom);
        }

        // DELETE: api/ClassRoom/5
        [ResponseType(typeof(ClassRoom))]
        public IHttpActionResult DeleteClassRoom(int id)
        {
            ClassRoom classroom = db.ClassRoom.Find(id);
            if (classroom == null)
            {
                return NotFound();
            }

            db.ClassRoom.Remove(classroom);
            db.SaveChanges();

            return Ok(classroom);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassRoomExists(int id)
        {
            return db.ClassRoom.Count(e => e.ClassRoomId == id) > 0;
        }
    }
}