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
    public class UserController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetUsersNum()
        {
            return db.User.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public IQueryable<User> GetUsersByPage(int page, int pageSize)
        {
            return db.User
                .OrderBy(u => u.UserId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取用户
        public IQueryable<User> GetUsersBySearch(string searchString)
        {
            return db.User.Where(u => u.UserName.Contains(searchString));
        }
        public List<User> GetNextConfig(int processid, int step)
        {
            var node = db.ApprovalNode.Where(an => an.ProcessId == processid).Where(an => an.Step == step).SingleOrDefault();
            if (node == null)
                return null;
            var nodeuserList = db.ApprovalNode_User.Where(nu => nu.NodeId == node.NodeId);
            List<User> userList = new List<Models.User>();
            foreach (var nodeuser in nodeuserList)
            {
                userList.Add(db.User.Find(nodeuser.UserId));
            }
            return userList;
        }

        public List<User> GetUsersByUser(int userid)
        {
            var userRole=db.User_Role.FirstOrDefault(ur => ur.UserId == userid);
            var role = db.Role.Find(userRole.RoleId);
            List<User> userList = new List<User>();
            if(role.RoleName=="学生")
            {
                int roleid = db.Role.FirstOrDefault(r => r.RoleName == "教师").RoleId;
                var urList=db.User_Role.Where(ur => ur.RoleId == roleid);
                foreach(var ur in urList)
                {
                    userList.Add(db.User.Find(ur.UserId));
                }
                return userList;
            }
            else if(role.RoleName=="教师")
            {
                int roleid = db.Role.FirstOrDefault(r => r.RoleName == "管理员").RoleId;
                var urList = db.User_Role.Where(ur => ur.RoleId == roleid);
                foreach (var ur in urList)
                {
                    userList.Add(db.User.Find(ur.UserId));
                }
                return userList;
            }
            else
            {
                return null;
            }
        }
        // GET api/User
        public IQueryable<User> GetUsers()
        {
            return db.User;
        }
        public User GetUserByName(string username)
        {
            return db.User.Where(u => u.UserName == username).FirstOrDefault();
        }
        // GET api/User/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.User.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT api/User/5
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UserId)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST api/User
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.User.Add(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.UserId }, user);
        }

        // DELETE api/User/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.User.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.User.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.User.Count(e => e.UserId == id) > 0;
        }
    }
}