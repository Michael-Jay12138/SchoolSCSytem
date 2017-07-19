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
    public class ClassRoom_UserController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetClassRoom_UsersNum()
        {
            return db.ClassRoom_User.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public List<SchoolSCSystem.ViewModels.ClassRoom_UserPro> GetClassRoom_UsersByPage(int page, int pageSize)
        {
            List<ClassRoom_User> ClassRoomUserList = db.ClassRoom_User
                .OrderBy(u => u.ClassRoomId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList();

            List<SchoolSCSystem.ViewModels.ClassRoom_UserPro> ClassRoom_UserProList = new List<ViewModels.ClassRoom_UserPro>();

            for (int i = 0; i < ClassRoomUserList.Count(); i++)
            {
                SchoolSCSystem.ViewModels.ClassRoom_UserPro classroomuserpro = new ViewModels.ClassRoom_UserPro();
                classroomuserpro.ClassRoomId = ClassRoomUserList[i].ClassRoomId;
                classroomuserpro.UserId = ClassRoomUserList[i].UserId;
                classroomuserpro.ClassRoomName = db.ClassRoom.Find(ClassRoomUserList[i].ClassRoomId).ClassRoomName;
                classroomuserpro.UserName = db.User.Find(ClassRoomUserList[i].UserId).UserName;
                ClassRoom_UserProList.Add(classroomuserpro);
            }
            return ClassRoom_UserProList;
        }
        //根据搜索词获取用户
        public IQueryable<ClassRoom_User> GetClassRoom_UsersBySearch(string searchString)
        {
            return db.ClassRoom_User.Where(u => u.ClassRoomId.ToString().Contains(searchString));
        }
        // GET: api/ClassRoom_User
        public IQueryable<ClassRoom_User> GetClassRoom_Users()
        {
            return db.ClassRoom_User;
        }

        // GET: api/ClassRoom_User/5
        [ResponseType(typeof(ClassRoom_User))]
        public IHttpActionResult GetClassRoom_User(int classroomid,int userid)
        {
            ClassRoom_User classroom_user = db.ClassRoom_User.Where(cu => cu.ClassRoomId == classroomid).Where(cu => cu.UserId == userid).SingleOrDefault();
            
            if (classroom_user == null)
            {
                return NotFound();
            }

            SchoolSCSystem.ViewModels.ClassRoom_UserPro classroom_userpro = new ViewModels.ClassRoom_UserPro();
            classroom_userpro.UserId = classroom_user.UserId;
            classroom_userpro.ClassRoomId = classroom_user.ClassRoomId;
            classroom_userpro.UserName = db.User.Find(classroom_user.UserId).UserName;
            classroom_userpro.ClassRoomName = db.ClassRoom.Find(classroom_user.ClassRoomId).ClassRoomName;
            return Ok(classroom_userpro);
        }

        // PUT: api/ClassRoom_User/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClassRoom_User(int classroomid,int userid, string classroom_user)
        {
            ClassRoom_User classroom_userupd = Newtonsoft.Json.JsonConvert.DeserializeObject<ClassRoom_User>(classroom_user);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            ClassRoom_User classroom_userbf = db.ClassRoom_User.Where(cu => cu.ClassRoomId == classroomid).Where(cu => cu.UserId == userid).SingleOrDefault();
            db.Entry(classroom_userbf).State = EntityState.Deleted;
            db.ClassRoom_User.Add(classroom_userupd);
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

        // POST: api/ClassRoom_User
        [ResponseType(typeof(ClassRoom_User))]
        public IHttpActionResult PostClassRoom_User(ClassRoom_User classroom_user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClassRoom_User.Add(classroom_user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ClassRoom_UserExists(classroom_user.ClassRoomId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = classroom_user.ClassRoomId }, classroom_user);
        }

        // DELETE: api/ClassRoom_User/5
        [ResponseType(typeof(ClassRoom_User))]
        public IHttpActionResult DeleteClassRoom_User(int classroomid,int userid)
        {
            ClassRoom_User classroom_user = db.ClassRoom_User.Where(cu => cu.ClassRoomId == classroomid).Where(cu => cu.UserId == userid).SingleOrDefault();
            if (classroom_user == null)
            {
                return NotFound();
            }

            db.ClassRoom_User.Remove(classroom_user);
            db.SaveChanges();

            return Ok(classroom_user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassRoom_UserExists(int id)
        {
            return db.ClassRoom_User.Count(e => e.ClassRoomId == id) > 0;
        }
    }
}