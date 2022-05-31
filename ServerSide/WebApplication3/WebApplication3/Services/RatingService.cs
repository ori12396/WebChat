using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class RatingService: IRatingService
    {
        private static List<Rating> ratings = new List<Rating>();
        private static int id = 0;
        public List<Rating> GetAll() { return ratings; }
        public Rating Get(int id) { return ratings.Find(x => x.Id == id); }
        public void Edit(int id,string name,string feedback, int rate ) {
            Rating rating = ratings.Find(rating => rating.Id == id);
            rating.Name = name;
            rating.Feedback = feedback;
            rating.Rate = rate;

        }
        public void Create(string name, string feedback, int rate)
        {
            DateTime now = DateTime.Now;
            DateTime today = DateTime.Today;
            int nextId = id + 1;
            Rating rating = new Rating() { Id=nextId,Name=name,Feedback=feedback,Rate=rate, Time = now.ToString("h:mm"), Date = today.ToString("d") };
            ratings.Add(rating);
        }

        public void Delete(int id ) { ratings.Remove(Get(id)); }
    }
}
