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
    public class Role_MenuController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetRole_MenusNum()
        {
            return db.Role_Menu.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public List<SchoolSCSystem.ViewModels.Role_MenuPro> GetRole_MenusByPage(int page, int pageSize)
        {
            List<Role_Menu> RoleMenuList=db.Role_Menu
                .OrderBy(u => u.RoleId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList();

            List<SchoolSCSystem.ViewModels.Role_MenuPro> Role_MenuProList = new List<ViewModels.Role_MenuPro>();

            for(int i=0;i<RoleMenuList.Count();i++)
            {
                SchoolSCSystem.ViewModels.Role_MenuPro rolemenupro = new ViewModels.Role_MenuPro();
                rolemenupro.RoleId = RoleMenuList[i].RoleId;
                rolemenupro.MenuId = RoleMenuList[i].MenuId;
                rolemenupro.RoleName = db.Role.Find(RoleMenuList[i].RoleId).RoleName;
                rolemenupro.MenuName = db.Menu.Find(RoleMenuList[i].MenuId).MenuName;
                Role_MenuProList.Add(rolemenupro);
            }
            return Role_MenuProList;
        }
        //根据搜索词获取用户
        public IQueryable<Role_Menu> GetRole_MenusBySearch(string searchString)
        {
            return db.Role_Menu.Where(u => u.RoleId.ToString().Contains(searchString));
        }
        // GET api/Role_Menu
        public IQueryable<Role_Menu> GetRole_Menus()
        {
            return db.Role_Menu;
        }

        // GET api/Role_Menu/5
        [ResponseType(typeof(Role_Menu))]
        public IHttpActionResult GetRole_Menu(int roleid,int menuid)
        {
            Role_Menu role_menu = db.Role_Menu.Where(rm => rm.RoleId == roleid).Where(rm => rm.MenuId == menuid).SingleOrDefault();
            if (role_menu == null)
            {
                return NotFound();
            }
            SchoolSCSystem.ViewModels.Role_MenuPro role_menupro = new ViewModels.Role_MenuPro();
            role_menupro.MenuId = role_menu.MenuId;
            role_menupro.RoleId = role_menu.RoleId;
            role_menupro.MenuName = db.Menu.Find(role_menu.MenuId).MenuName;
            role_menupro.RoleName = db.Role.Find(role_menu.RoleId).RoleName;
            return Ok(role_menupro);
        }

        // PUT api/Role_Menu/5
        public IHttpActionResult PutRole_Menu(int roleid,int menuid,string role_menu)
        {
            Role_Menu role_menuupd = Newtonsoft.Json.JsonConvert.DeserializeObject<Role_Menu>(role_menu);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            Role_Menu role_menubf = db.Role_Menu.Where(rm => rm.RoleId == roleid).Where(rm => rm.MenuId == menuid).SingleOrDefault();
            db.Entry(role_menubf).State = EntityState.Deleted;
            db.Role_Menu.Add(role_menuupd);
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

        // POST api/Role_Menu
        [ResponseType(typeof(Role_Menu))]
        public IHttpActionResult PostRole_Menu(Role_Menu role_menu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Role_Menu.Add(role_menu);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Role_MenuExists(role_menu.RoleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = role_menu.RoleId }, role_menu);
        }

        // DELETE api/Role_Menu/5
        [ResponseType(typeof(Role_Menu))]
        public IHttpActionResult DeleteRole_Menu(int roleid, int menuid)
        {
            Role_Menu role_menu = db.Role_Menu.Where(rm => rm.RoleId == roleid).Where(rm => rm.MenuId == menuid).SingleOrDefault();
            if (role_menu == null)
            {
                return NotFound();
            }

            db.Role_Menu.Remove(role_menu);
            db.SaveChanges();

            return Ok(role_menu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Role_MenuExists(int id)
        {
            return db.Role_Menu.Count(e => e.RoleId == id) > 0;
        }
    }
}