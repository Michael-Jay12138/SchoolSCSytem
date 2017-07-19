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
    public class RoleController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        //获取用户总数
        public int GetRolesNum()
        {
            return db.Role.Count();
        }
        //根据当前页面获取用户
        [HttpGet]
        public IQueryable<Role> GetRolesByPage(int page, int pageSize)
        {
            return db.Role
                .OrderBy(u => u.RoleId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize);
        }
        //根据搜索词获取用户
        public IQueryable<Role> GetRolesBySearch(string searchString)
        {
            return db.Role.Where(u => u.RoleName.Contains(searchString));
        }
        // GET api/Role
        public IQueryable<Role> GetRoles()
        {
            return db.Role;
        }

        // GET api/Role/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult GetRole(int id)
        {
            Role role = db.Role.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        // PUT api/Role/5
        public IHttpActionResult PutRole(int id, Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != role.RoleId)
            {
                return BadRequest();
            }

            db.Entry(role).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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

        // POST api/Role
        [ResponseType(typeof(Role))]
        public IHttpActionResult PostRole(Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Role.Add(role);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (RoleExists(role.RoleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = role.RoleId }, role);
        }

        // DELETE api/Role/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult DeleteRole(int id)
        {
            Role role = db.Role.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            db.Role.Remove(role);
            db.SaveChanges();

            return Ok(role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoleExists(int id)
        {
            return db.Role.Count(e => e.RoleId == id) > 0;
        }
    }
}