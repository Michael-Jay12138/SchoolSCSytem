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
    public class ApprovalNodeController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetApprovalNodesNum()
        {
            return db.ApprovalNode.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public IQueryable<ApprovalNode> GetApprovalNodesByPage(int page, int pageSize)
        {
            return db.ApprovalNode
                .OrderBy(u => u.NodeId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        ////根据搜索词获取用户
        //public IQueryable<ApprovalNode> GetApprovalNodesBySearch(string searchString)
        //{
        //    return db.ApprovalNode.Where(u => u.NodelId.Contains(searchString));
        //}

        // GET: api/ApprovalNode
        public IQueryable<ApprovalNode> GetApprovalNodes()
        {
            return db.ApprovalNode;
        }
        public List<ApprovalNode> GetApprovalNodesByProcessId(int processid)
        {
            return db.ApprovalNode.Where(n => n.ProcessId == processid).ToList();
        }
        // GET: api/ApprovalNode/5
        [ResponseType(typeof(ApprovalNode))]
        public IHttpActionResult GetApprovalNode(int id)
        {
            ApprovalNode approvalNode = db.ApprovalNode.Find(id);
            if (approvalNode == null)
            {
                return NotFound();
            }

            return Ok(approvalNode);
        }

        // PUT: api/ApprovalNode/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutApprovalNode(int id, ApprovalNode approvalNode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != approvalNode.NodeId)
            {
                return BadRequest();
            }

            db.Entry(approvalNode).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApprovalNodeExists(id))
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

        // POST: api/ApprovalNode
        [ResponseType(typeof(ApprovalNode))]
        public IHttpActionResult PostApprovalNode(ApprovalNode approvalNode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ApprovalNode.Add(approvalNode);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ApprovalNodeExists(approvalNode.NodeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = approvalNode.NodeId }, approvalNode);
        }

        // DELETE: api/ApprovalNode/5
        [ResponseType(typeof(ApprovalNode))]
        public IHttpActionResult DeleteApprovalNode(int id)
        {
            ApprovalNode approvalNode = db.ApprovalNode.Find(id);
            if (approvalNode == null)
            {
                return NotFound();
            }

            db.ApprovalNode.Remove(approvalNode);
            db.SaveChanges();

            return Ok(approvalNode);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApprovalNodeExists(int id)
        {
            return db.ApprovalNode.Count(e => e.NodeId == id) > 0;
        }
    }
}