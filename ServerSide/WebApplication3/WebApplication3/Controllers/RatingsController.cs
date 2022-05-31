using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;
using WebApplication3.Models;
using WebApplication3.Services;
namespace WebApplication3.Controllers
{
    public class RatingsController : Controller
    {
        private IRatingService service;

        public RatingsController()
        {
            service = new RatingService();
        }

        // GET: Ratings
        public IActionResult Index()
        {
            var ratings = service.GetAll();
            if (ratings.Count == 0)
            {
                ViewBag.name = "none";
            }
            else
            {
                float avg = ratings.Sum(r => r.Rate) / (float)ratings.Count;
                ViewBag.name = avg;

            }
            return View(service.GetAll());
        }

        // GET: Ratings/Details/5
        public IActionResult Details(int id)
        {
            if (id == null)
                return NotFound();
            var rating = service.Get(id);
            if (rating == null)
                return NotFound();
            return View(rating);

        }

        // GET: Ratings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Ratings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("Id,Rate,Name,Feedback,Date,Time")] Rating rating)
        {
            if (ModelState.IsValid)
            {
                service.Create(rating.Name,rating.Feedback,rating.Rate);
                return RedirectToAction(nameof(Index));
            }
            var errors = ModelState.Values.SelectMany(v => v.Errors);
             return View(rating);

        }

        // GET: Ratings/Edit/5
        public IActionResult Edit(int? id)
        {
            if (id == null )
            {
                return NotFound();
            }

            var rating = service.Get((int)id);
            if (rating == null)
            {
                return NotFound();
            }
            return View(rating);
        }

        // POST: Ratings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,Rate,Name,Feedback,Date,Time")] Rating rating)
        {
            if (id != rating.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    service.Edit(id, rating.Name, rating.Feedback, rating.Rate);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RatingExists(rating.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Delete/5
        public IActionResult Delete(int? id)
        {
            if (id == null || service.GetAll() == null)
            {
                return NotFound();
            }

            var rating = service.Get((int)id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            if (service.GetAll() == null)
            {
                return Problem("Entity set 'WebApplication3Context.Rating'  is null.");
            }
            var rating = service.Get((int)id); ;
            if (rating != null)
            {
                service.Delete(id);
            }
            
            return RedirectToAction(nameof(Index));
        }
        public bool check(int num,string query)
        {
           /* if((query=="1" && num==1)|| (query == "2" && num == 2)||(query == "3" && num == 3)||(query == "4" && num == 4)||(query == "5" && num == 5))
            {
                return true;
            }*/
            bool c=string.Compare(num.ToString(), query)==0;
            return c;
            
        }
        public IActionResult Search(string query)
        {
            var q = service.GetAll().Where(r=>r.Name.Contains(query)||r.Feedback.Contains(query)||check(r.Rate,query));
            
            return PartialView(q);
        }

        private bool RatingExists(int id)
        {
          return (service.GetAll()?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
