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
    public class ScoreController : ApiController
    {
        private SchoolSCSystemEntities db = new SchoolSCSystemEntities();
        public class CharsDataArr
        {
            public string[] Coursearr;
            public int[] Scorearr;
        }

        public CharsDataArr GetCharsDataByStudentId(int studentid)
        {
            CharsDataArr objectarr = new CharsDataArr();
            int i = db.Score.Where(s => s.StudentId == studentid).Count();
            string[] Coursearr = new string[i];
            int[] Scorearr = new int[i];

            for (int n = 0; n < i; n++)
            {
                Coursearr[n] = db.Course.Find(db.Score.Where(s => s.StudentId == studentid).OrderBy(s => s.CourseId).Skip(n).First().CourseId).CourseName;
                Scorearr[n] = db.Score.Where(s => s.StudentId == studentid).OrderBy(s => s.CourseId).Skip(n).First().Score1;
            }
            objectarr.Scorearr = Scorearr;
            objectarr.Coursearr = Coursearr;
            return objectarr;

        }
        //获取分数总数
        public int GetScoresNum()
        {
            return db.Score.Count();
        }
        //vm转换
        private List<SchoolSCSystem.ViewModels.ScorePro> ScoreToScorePro(List<Score> ScoreList)
        {
            List<SchoolSCSystem.ViewModels.ScorePro> ScoreProList = new List<ViewModels.ScorePro>();

            for (int i = 0; i < ScoreList.Count(); i++)
            {
                SchoolSCSystem.ViewModels.ScorePro scorepro = new ViewModels.ScorePro();
                scorepro.ScoreId = ScoreList[i].ScoreId;
                scorepro.StudentId = ScoreList[i].StudentId;
                scorepro.StudentName = db.User.Find(ScoreList[i].StudentId).UserName;
                scorepro.CourseId = ScoreList[i].CourseId;
                scorepro.CourseName = db.Course.Find(ScoreList[i].CourseId).CourseName;
                scorepro.Score = ScoreList[i].Score1;
                ScoreProList.Add(scorepro);
            }
            return ScoreProList;
        }
        //根据当前页面获取分数
        [HttpGet]
        public List<ViewModels.ScorePro> GetScoresByPage(int page, int pageSize)
        {
            return ScoreToScorePro(db.Score
                .OrderBy(u => u.ScoreId)
                .Skip(pageSize * (page - 1))
                .Take(pageSize).ToList());
        }
        //根据搜索词获取用户
        public IQueryable<Score> GetScoresBySearch(string searchString)
        {
            return db.Score.Where(u => u.Score1.ToString().Contains(searchString));
        }

        // GET: api/Score
        public IQueryable<Score> GetScore()
        {
            return db.Score;
        }

        // GET: api/Score/5
        [ResponseType(typeof(Score))]
        public IHttpActionResult GetScore(int id)
        {
            Score score = db.Score.Find(id);
            if (score == null)
            {
                return NotFound();
            }

            return Ok(score);
        }

        // PUT: api/Score/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutScore(int id, Score score)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != score.ScoreId)
            {
                return BadRequest();
            }

            db.Entry(score).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScoreExists(id))
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

        // POST: api/Score
        [ResponseType(typeof(Score))]
        public IHttpActionResult PostScore(Score score)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Score.Add(score);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ScoreExists(score.ScoreId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = score.ScoreId }, score);
        }

        // DELETE: api/Score/5
        [ResponseType(typeof(Score))]
        public IHttpActionResult DeleteScore(int id)
        {
            Score score = db.Score.Find(id);
            if (score == null)
            {
                return NotFound();
            }

            db.Score.Remove(score);
            db.SaveChanges();

            return Ok(score);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ScoreExists(int id)
        {
            return db.Score.Count(e => e.ScoreId == id) > 0;
        }
    }
}