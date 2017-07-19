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
    public class LeaveController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetLeavesNum()
        {
            return db.Leave.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public IQueryable<Leave> GetLeavesByPage(int page, int pageSize)
        {
            return db.Leave
                .OrderBy(u => u.LeaveId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取用户
        public IQueryable<Leave> GetLeavesBySearch(string searchString)
        {
            return db.Leave.Where(u => u.LeaveStuId.ToString().Contains(searchString));
        }
        // GET: api/Leave
        public IQueryable<Leave> GetLeaves()
        {
            return db.Leave;
        }

        // GET: api/Leave/5
        [ResponseType(typeof(Leave))]
        public IHttpActionResult GetLeave(int id)
        {
            Leave @leave = db.Leave.Find(id);
            if (@leave == null)
            {
                return NotFound();
            }

            return Ok(@leave);
        }

        // PUT: api/Leave/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLeave(int id, Leave @leave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != @leave.LeaveId)
            {
                return BadRequest();
            }

            db.Entry(@leave).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveExists(id))
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

        // POST: api/Leave
        [ResponseType(typeof(Leave))]
        public IHttpActionResult PostLeave(Leave @leave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Leave.Add(@leave);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = @leave.LeaveId }, @leave);
        }

        // DELETE: api/Leave/5
        [ResponseType(typeof(Leave))]
        public IHttpActionResult DeleteLeave(int id)
        {
            Leave @leave = db.Leave.Find(id);
            if (@leave == null)
            {
                return NotFound();
            }

            db.Leave.Remove(@leave);
            db.SaveChanges();

            return Ok(@leave);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LeaveExists(int id)
        {
            return db.Leave.Count(e => e.LeaveId == id) > 0;
        }
    }
}