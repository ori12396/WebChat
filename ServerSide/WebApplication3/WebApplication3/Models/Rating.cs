using System.ComponentModel.DataAnnotations;

namespace WebApplication3.Models
{
    public class Rating
    {
        public int Id { get; set; }
       
        [Range(1, 5)]
        public int Rate { get; set; }
      
        public string Name { get; set; }
        [RegularExpression("^[a-zA-Z]*$")]
        [MaxLength(50)]
        public string Feedback { get; set; }
        
        public string? Date { get; set; }
        public string? Time { get; set; }

    }
}
