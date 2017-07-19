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
    public class User_RoleController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();

        public int GetUser_RolesNum()
        {
            return db.User_Role.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public List<SchoolSCSystem.ViewModels.User_RolePro> GetUser_RolesByPage(int page, int pageSize)
        {
            List<User_Role> UserRoleList = db.User_Role
                .OrderBy(u => u.UserId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList() ;

            List<SchoolSCSystem.ViewModels.User_RolePro> User_RoleProList = new List<ViewModels.User_RolePro>();
            for (int i = 0; i < UserRoleList.Count(); i++)
            {
                SchoolSCSystem.ViewModels.User_RolePro userrolepro = new ViewModels.User_RolePro();
                userrolepro.UserId = UserRoleList[i].UserId;
                userrolepro.RoleId = UserRoleList[i].RoleId;
                userrolepro.UserName = db.User.Find(UserRoleList[i].UserId).UserName;
                userrolepro.RoleName = db.Role.Find(UserRoleList[i].RoleId).RoleName;
                User_RoleProList.Add(userrolepro);
            }
            return User_RoleProList;
        }
        //根据搜索词获取用户
        public IQueryable<User_Role> GetUser_RolesBySearch(string searchString)
        {
            return db.User_Role.Where(u => u.UserId.ToString().Contains(searchString));
        }
        // GET: api/User_Role
        public IQueryable<User_Role> GetUser_Roles()
        {
            return db.User_Role;
        }

        // GET: api/User_Role/5
        [ResponseType(typeof(User_Role))]
        public IHttpActionResult GetUser_Role(int userid,int roleid)
        {
            User_Role user_role = db.User_Role.Where(rm => rm.UserId == userid).Where(rm => rm.RoleId == roleid).SingleOrDefault();
            if (user_role == null)
            {
                return NotFound();
            }

            return Ok(user_role);
        }
        public bool GetUser_Role(int userid)
        {
            User_Role user_role = db.User_Role.Where(rm => rm.UserId == userid).SingleOrDefault();
            if(db.Role.Find(user_role.RoleId).RoleName=="管理员")
            return true;
            else
            return false;
        }

        // PUT: api/User_Role/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser_Role(int userid, int roleid, string user_role)
        {
            User_Role user_roleupd = Newtonsoft.Json.JsonConvert.DeserializeObject<User_Role>(user_role);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //if (id != user_Role.UserId)
            //{
            //    return BadRequest();
            //}

            //db.Entry(user_Role).State = EntityState.Modified;

            User_Role user_rolebf = db.User_Role.Where(rm => rm.UserId == userid).Where(rm => rm.RoleId == roleid).SingleOrDefault();
            db.Entry(user_rolebf).State = EntityState.Deleted;
            db.User_Role.Add(user_roleupd);
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

        // POST: api/User_Role
        [ResponseType(typeof(User_Role))]
        public IHttpActionResult PostUser_Role(User_Role user_role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.User_Role.Add(user_role);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (User_RoleExists(user_role.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user_role.UserId }, user_role);
        }

        // DELETE: api/User_Role/5
        [ResponseType(typeof(User_Role))]
        public IHttpActionResult DeleteUser_Role(int userid,int roleid)
        {
            User_Role user_role = db.User_Role.Where(rm => rm.UserId == userid).Where(rm => rm.RoleId == roleid).SingleOrDefault();
            if (user_role == null)
            {
                return NotFound();
            }

            db.User_Role.Remove(user_role);
            db.SaveChanges();

            return Ok(user_role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool User_RoleExists(int id)
        {
            return db.User_Role.Count(e => e.UserId == id) > 0;
        }
    }
}