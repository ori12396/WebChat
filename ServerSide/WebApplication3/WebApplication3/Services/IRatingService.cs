using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface IRatingService
    {
        private static List<Rating> ratings = new List<Rating>();
        public List<Rating> GetAll();
        public Rating Get(int id);
        public void Edit(int id, string name, string feedback, int rate);
        public void Create(string name, string feedback, int rate);

        public void Delete(int id);
    }
}
