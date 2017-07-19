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
    public class ApprovalDataController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        public int[] GetObjectsNum(int userId)
        {
            int[] arr = new int[3];
            arr[0] = db.ApprovalData.Where(a => a.ApprovalType == "选课").Where(a => a.UserId == userId).Count();
            arr[1] = db.ApprovalData.Where(a => a.ApprovalType == "请假").Where(a => a.UserId == userId).Count();
            arr[2] = db.ApprovalData.Where(a => a.ApprovalType == "预定教室").Where(a => a.UserId == userId).Count();
            return arr;
        }
        public class ObjectDetail
        {
            public int approvalId;
            public string approvalType;
            public string creatorName;
            public string creatorAvatar;
            public string objectName;
        }

        public List<ObjectDetail> GetObjectDetail(int userid)
        {
            List<ApprovalData> ApprovalList = db.ApprovalData.Where(u => u.UserId == userid).ToList();
            List<ObjectDetail> ObejctDetailList = new List<ObjectDetail>();
            foreach (var approvalData in ApprovalList)
            {
                ObjectDetail obj = new ObjectDetail();
                obj.approvalId = approvalData.DataId;
                obj.approvalType = approvalData.ApprovalType;
                obj.creatorName = db.User.Find(approvalData.CreatorId).UserName;
                obj.creatorAvatar = db.User.Find(approvalData.CreatorId).UserAvatar;
                switch (approvalData.ApprovalType)
                {
                    case "选课":
                        obj.objectName = db.Course.Find(approvalData.SelectCourseId).CourseName;
                        break;
                    case "预定教室":
                        obj.objectName = db.ClassRoom.Find(approvalData.SelectClassRoomId).ClassRoomName;
                        break;
                    case "请假":
                        obj.objectName = db.Leave.Find(approvalData.SelectLeaveId).LeaveReason;
                        break;

                }
                ObejctDetailList.Add(obj);
            }
            return ObejctDetailList;

        }
        //获取用户总数
        public int GetApprovalDatasNum()
        {
            return db.ApprovalData.Count();
        }
        //根据当前页面获取审批数据
        [HttpGet]
        public List<SchoolSCSystem.ViewModels.ApprovalDataPro> GetApprovalDatasByPage(int page, int pageSize)
        {
            List< ApprovalData> ApprovalDatalist=db.ApprovalData
                .OrderBy(u => u.DataId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList();

            List<SchoolSCSystem.ViewModels.ApprovalDataPro> ApprovalDataProList = new List<ViewModels.ApprovalDataPro>();
            for (int i = 0; i < ApprovalDatalist.Count(); i++)
            {
                SchoolSCSystem.ViewModels.ApprovalDataPro approvaldatapro = new ViewModels.ApprovalDataPro();
                approvaldatapro.DataId = ApprovalDatalist[i].DataId;
                approvaldatapro.UserId = ApprovalDatalist[i].UserId.Value;
                approvaldatapro.FlowId = ApprovalDatalist[i].FlowId;
                approvaldatapro.State = ApprovalDatalist[i].State;
                approvaldatapro.Step = ApprovalDatalist[i].Step;
                approvaldatapro.CreatorId = ApprovalDatalist[i].CreatorId;
                if (ApprovalDatalist[i].UserId != 0)
                    approvaldatapro.UserName = db.User.Find(ApprovalDatalist[i].UserId).UserName;
                else
                    approvaldatapro.UserName = "无";
                approvaldatapro.CreatorName = db.User.Find(ApprovalDatalist[i].CreatorId).UserName;
                approvaldatapro.FlowName = db.ApprovalProcess.Find(ApprovalDatalist[i].FlowId).ProcessName;
                approvaldatapro.ApprovalType = ApprovalDatalist[i].ApprovalType;
                approvaldatapro.SelectCourseId = ApprovalDatalist[i].SelectCourseId;
                approvaldatapro.SelectLeaveId = ApprovalDatalist[i].SelectLeaveId;
                approvaldatapro.SelectClassRoomId = ApprovalDatalist[i].SelectClassRoomId;
                ApprovalDataProList.Add(approvaldatapro);

            }
                return ApprovalDataProList;
        }
        //根据搜索词获取用户
        //public IQueryable<ApprovalData> GetApprovalDatasBySearch(string searchString)
        //{
        //    return db.ApprovalData.Where(u => u.UserName.Contains(searchString));
        //}
         //GET: api/ApprovalData
        public IQueryable<ApprovalData> GetApprovalDatas()
        {
            return db.ApprovalData;
        }

        // GET: api/ApprovalData/5
        [ResponseType(typeof(ApprovalData))]
        public IHttpActionResult GetApprovalData(int id)
        {
            ApprovalData approvalData = db.ApprovalData.Find(id);
            if (approvalData == null)
            {
                return NotFound();
            }
            SchoolSCSystem.ViewModels.ApprovalDataPro approvaldatapro = new ViewModels.ApprovalDataPro();
            approvaldatapro.DataId = approvalData.DataId;
            approvaldatapro.UserId = approvalData.UserId.Value;
            approvaldatapro.FlowId = approvalData.FlowId;
            approvaldatapro.State = approvalData.State;
            approvaldatapro.Step = approvalData.Step;
            approvaldatapro.CreatorId = approvalData.CreatorId;
            approvaldatapro.UserName = db.User.Find(approvalData.UserId).UserName;
            approvaldatapro.CreatorName = db.User.Find(approvalData.CreatorId).UserName;
            approvaldatapro.FlowName = db.ApprovalProcess.Find(approvalData.FlowId).ProcessName;
            approvaldatapro.ApprovalType = approvalData.ApprovalType;
            approvaldatapro.SelectCourseId = approvalData.SelectCourseId;
            approvaldatapro.SelectLeaveId = approvalData.SelectLeaveId;
            approvaldatapro.SelectClassRoomId = approvalData.SelectClassRoomId;

            return Ok(approvaldatapro);
        }

        // PUT: api/ApprovalData/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutApprovalData(int id, string approvalData)
        {
            ApprovalData approvalupd = Newtonsoft.Json.JsonConvert.DeserializeObject<ApprovalData>(approvalData);
            

            if (id != approvalupd.DataId)
            {
                return BadRequest();
            }

            db.Entry(approvalupd).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApprovalDataExists(id))
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

        // POST: api/ApprovalData
        [ResponseType(typeof(ApprovalData))]
        public IHttpActionResult PostApprovalData(ApprovalData approvalData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ApprovalData.Add(approvalData);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ApprovalDataExists(approvalData.DataId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = approvalData.DataId }, approvalData);
        }

        // DELETE: api/ApprovalData/5
        [ResponseType(typeof(ApprovalData))]
        public IHttpActionResult DeleteApprovalData(int id)
        {
            ApprovalData approvalData = db.ApprovalData.Find(id);
            if (approvalData == null)
            {
                return NotFound();
            }

            db.ApprovalData.Remove(approvalData);
            db.SaveChanges();

            return Ok(approvalData);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApprovalDataExists(int id)
        {
            return db.ApprovalData.Count(e => e.DataId == id) > 0;
        }
    }
}