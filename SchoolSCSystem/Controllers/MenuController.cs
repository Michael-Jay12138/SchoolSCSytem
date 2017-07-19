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
    public class MenuController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetMenusNum()
        {
            return db.Menu.Count();
        }
        //vm转换
        private List<SchoolSCSystem.ViewModels.MenuPro> MenuToMenuPro(List<Menu> MenuList)
        {
            List<SchoolSCSystem.ViewModels.MenuPro> MenuProList = new List<ViewModels.MenuPro>();

            for (int i = 0; i < MenuList.Count(); i++)
            {
                SchoolSCSystem.ViewModels.MenuPro menupro = new ViewModels.MenuPro();
                menupro.MenuId = MenuList[i].MenuId;
                if (MenuList[i].ParentId == 0)
                {
                    menupro.ParentName = "根节点";
                }
                else
                    menupro.ParentName = db.Menu.Find(MenuList[i].ParentId).MenuName;
                menupro.ParentId = MenuList[i].ParentId;
                menupro.MenuName = MenuList[i].MenuName;
                menupro.State = MenuList[i].State;
                menupro.PageUrl = MenuList[i].PageUrl;
                menupro.MenuLevel = MenuList[i].MenuLevel;
                menupro.Icon = MenuList[i].Icon;
                MenuProList.Add(menupro);
            }
            return MenuProList;
        }
        //根据当前页面获取菜单
        [HttpGet]
        public List<SchoolSCSystem.ViewModels.MenuPro> GetMenusByPage(int page, int pageSize)
        {
            List<Menu> MenuList= db.Menu
                .OrderBy(u => u.MenuId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList();

            return MenuToMenuPro(MenuList);
        }
        public List<SchoolSCSystem.ViewModels.MenuPro> GetMenusByUserId(int userId)
        {
            IQueryable<Role_Menu> rmList=db.Role_Menu.Where(rm => rm.RoleId == db.User_Role.FirstOrDefault(ur => ur.UserId == userId).RoleId);
            List<Menu> menuList=new List<Menu>();
            foreach(var rm in rmList)
            {
                menuList.Add(db.Menu.Find(rm.MenuId));
            }
            return MenuToMenuPro(menuList);
        }
        //根据搜索词获取菜单
        public IQueryable<Menu> GetMenusBySearch(string searchString)
        {
            return db.Menu.Where(u => u.MenuName.Contains(searchString));
        }
        public IQueryable<Menu> GetMenusByIds(int[] Id)
        {
            return db.Menu.Where(m => Id.Contains(m.MenuId));
        }
        // GET api/Menu
        public List<SchoolSCSystem.ViewModels.MenuPro> GetMenus()
        {
            return MenuToMenuPro(db.Menu.ToList());
        }

        // GET api/Menu/5
        [ResponseType(typeof(Menu))]
        public IHttpActionResult GetMenu(int id)
        {
            Menu menu = db.Menu.Find(id);
            if (menu == null)
            {
                return NotFound();
            }

            return Ok(menu);
        }

        // PUT api/Menu/5
        public IHttpActionResult PutMenu(int id, Menu menu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != menu.MenuId)
            {
                return BadRequest();
            }

            db.Entry(menu).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuExists(id))
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

        // POST api/Menu
        [ResponseType(typeof(Menu))]
        public IHttpActionResult PostMenu(Menu menu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Menu.Add(menu);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MenuExists(menu.MenuId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = menu.MenuId }, menu);
        }

        // DELETE api/Menu/5
        [ResponseType(typeof(Menu))]
        public IHttpActionResult DeleteMenu(int id)
        {
            Menu menu = db.Menu.Find(id);
            if (menu == null)
            {
                return NotFound();
            }

            db.Menu.Remove(menu);
            var rmList=db.Role_Menu.Where(rm => rm.MenuId == menu.MenuId);
            foreach(var rm in rmList)
            {
                db.Role_Menu.Remove(rm);
            }
            db.SaveChanges();

            return Ok(menu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MenuExists(int id)
        {
            return db.Menu.Count(e => e.MenuId == id) > 0;
        }
    }
}