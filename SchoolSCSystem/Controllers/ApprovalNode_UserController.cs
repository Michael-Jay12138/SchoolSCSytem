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
    public class ApprovalNode_UserController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();

        //获取用户总数
        public int GetApprovalNode_UsersNum()
        {
            return db.ApprovalNode_User.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public List<SchoolSCSystem.ViewModels.ApprovalNode_UserPro> GetApprovalNode_UsersByPage(int page, int pageSize)
        {
            List<ApprovalNode_User> ApprovalNodeUserList = db.ApprovalNode_User
                .OrderBy(u => u.NodeId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList();

            List<SchoolSCSystem.ViewModels.ApprovalNode_UserPro> ApprovalNode_UserProList = new List<ViewModels.ApprovalNode_UserPro>();

            for (int i = 0; i < ApprovalNodeUserList.Count(); i++)
            {
                SchoolSCSystem.ViewModels.ApprovalNode_UserPro approvalnodeuserpro = new ViewModels.ApprovalNode_UserPro();
                approvalnodeuserpro.NodeId = ApprovalNodeUserList[i].NodeId;
                approvalnodeuserpro.UserId = ApprovalNodeUserList[i].UserId;
                //approvalnodeuserpro.NodeName = db.ApprovalNode.Find(ApprovalNodeUserList[i].NodeId).NodeId;
                approvalnodeuserpro.UserName = db.User.Find(ApprovalNodeUserList[i].UserId).UserName;
                ApprovalNode_UserProList.Add(approvalnodeuserpro);
            }
            return ApprovalNode_UserProList;
        }
        //根据搜索词获取用户
        public IQueryable<ApprovalNode_User> GetApprovalNode_UsersBySearch(string searchString)
        {
            return db.ApprovalNode_User.Where(u => u.NodeId.ToString().Contains(searchString));
        }

        // GET: api/ApprovalNode_User
        public IQueryable<ApprovalNode_User> GetApprovalNode_Users()
        {
            return db.ApprovalNode_User;
        }

        // GET: api/ApprovalNode_User/5
        [ResponseType(typeof(ApprovalNode_User))]
        public IHttpActionResult GetApprovalNode_User(int nodeid, int userid)
        {
            ApprovalNode_User approvalnode_user = db.ApprovalNode_User.Where(rm => rm.NodeId == nodeid).Where(rm => rm.UserId == userid).SingleOrDefault();
            if (approvalnode_user == null)
            {
                return NotFound();
            }
            SchoolSCSystem.ViewModels.ApprovalNode_UserPro approvalnode_userpro = new ViewModels.ApprovalNode_UserPro();
            approvalnode_userpro.NodeId = approvalnode_user.NodeId;
            approvalnode_userpro.UserId = approvalnode_user.UserId;
            approvalnode_userpro.UserName = db.User.Find(approvalnode_user.UserId).UserName;

            return Ok(approvalnode_userpro);
        }

        // PUT: api/ApprovalNode_User/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutApprovalNode_User(int nodeid, int userid, string approvalnode_user)
        {
            ApprovalNode_User approvalnode_userupd = Newtonsoft.Json.JsonConvert.DeserializeObject<ApprovalNode_User>(approvalnode_user);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            ApprovalNode_User approvalnode_userbf = db.ApprovalNode_User.Where(rm => rm.NodeId == nodeid).Where(rm => rm.UserId == userid).SingleOrDefault();
            db.Entry(approvalnode_userbf).State = EntityState.Deleted;
            db.ApprovalNode_User.Add(approvalnode_userupd);
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ApprovalNode_User
        [ResponseType(typeof(ApprovalNode_User))]
        public IHttpActionResult PostApprovalNode_User(ApprovalNode_User approvalNode_User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ApprovalNode_User.Add(approvalNode_User);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ApprovalNode_UserExists(approvalNode_User.NodeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = approvalNode_User.NodeId }, approvalNode_User);
        }

        // DELETE: api/ApprovalNode_User/5
        [ResponseType(typeof(ApprovalNode_User))]
        public IHttpActionResult DeleteApprovalNode_User(int nodeid, int userid)
        {
            ApprovalNode_User approvalnode_user = db.ApprovalNode_User.Where(rm => rm.NodeId == nodeid).Where(rm => rm.UserId == userid).SingleOrDefault();
            if (approvalnode_user == null)
            {
                return NotFound();
            }

            db.ApprovalNode_User.Remove(approvalnode_user);
            db.SaveChanges();

            return Ok(approvalnode_user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApprovalNode_UserExists(int id)
        {
            return db.ApprovalNode_User.Count(e => e.NodeId == id) > 0;
        }
    }
}