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
    public class ApprovalProcessController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetApprovalProcessesNum()
        {
            return db.ApprovalProcess.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public IQueryable<ApprovalProcess> GetApprovalProcessesByPage(int page, int pageSize)
        {
            return db.ApprovalProcess
                .OrderBy(u => u.ProcessId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取用户
        public IQueryable<ApprovalProcess> GetApprovalProcessesBySearch(string searchString)
        {
            return db.ApprovalProcess.Where(u => u.ProcessName.Contains(searchString));
        }
        // GET: api/ApprovalProcess
        public IQueryable<ApprovalProcess> GetApprovalProcesses()
        {
            return db.ApprovalProcess;
        }

        // GET: api/ApprovalProcess/5
        [ResponseType(typeof(ApprovalProcess))]
        public IHttpActionResult GetApprovalProcess(int id)
        {
            ApprovalProcess approvalProcess = db.ApprovalProcess.Find(id);
            if (approvalProcess == null)
            {
                return NotFound();
            }

            return Ok(approvalProcess);
        }

        // PUT: api/ApprovalProcess/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutApprovalProcess(int id, ApprovalProcess approvalProcess)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != approvalProcess.ProcessId)
            {
                return BadRequest();
            }

            db.Entry(approvalProcess).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApprovalProcessExists(id))
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

        // POST: api/ApprovalProcess
        [ResponseType(typeof(ApprovalProcess))]
        public IHttpActionResult PostApprovalProcess(ApprovalProcess approvalProcess)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ApprovalProcess.Add(approvalProcess);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ApprovalProcessExists(approvalProcess.ProcessId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = approvalProcess.ProcessId }, approvalProcess);
        }

        // DELETE: api/ApprovalProcess/5
        [ResponseType(typeof(ApprovalProcess))]
        public IHttpActionResult DeleteApprovalProcess(int id)
        {
            ApprovalProcess approvalProcess = db.ApprovalProcess.Find(id);
            if (approvalProcess == null)
            {
                return NotFound();
            }

            db.ApprovalProcess.Remove(approvalProcess);
            db.SaveChanges();

            return Ok(approvalProcess);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApprovalProcessExists(int id)
        {
            return db.ApprovalProcess.Count(e => e.ProcessId == id) > 0;
        }
    }
}