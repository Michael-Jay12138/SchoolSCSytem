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
    public class LogController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取..总数
        public int GetLogsNum()
        {
            return db.Log.Count();
        }
        //根据当前页面获取..
        [HttpGet]
        public IQueryable<Log> GetLogsByPage(int page, int pageSize)
        {
            return db.Log
                .OrderBy(u => u.LogId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取..
        //public IQueryable<Log> GetLogsBySearch(string searchString)
        //{
        //    return db.Log.Where(u => u.Description.Contains(searchString));
        //}

        // GET: api/Log
        public IQueryable<Log> GetLogs()
        {
            return db.Log;
        }

        // GET: api/Log/5
        [ResponseType(typeof(Log))]
        public IHttpActionResult GetLog(int id)
        {
            Log log = db.Log.Find(id);
            if (log == null)
            {
                return NotFound();
            }

            return Ok(log);
        }

        // PUT: api/Log/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLog(int id, Log log)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != log.LogId)
            {
                return BadRequest();
            }

            db.Entry(log).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LogExists(id))
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

        // POST: api/Log
        [ResponseType(typeof(Log))]
        public IHttpActionResult PostLog(Log log)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Log.Add(log);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (LogExists(log.LogId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = log.LogId }, log);
        }

        // DELETE: api/Log/5
        [ResponseType(typeof(Log))]
        public IHttpActionResult DeleteLog(int id)
        {
            Log log = db.Log.Find(id);
            if (log == null)
            {
                return NotFound();
            }

            db.Log.Remove(log);
            db.SaveChanges();

            return Ok(log);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LogExists(int id)
        {
            return db.Log.Count(e => e.LogId == id) > 0;
        }
    }
}