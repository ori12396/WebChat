namespace WebApplication5.Models
{
    public class User
    {
        public string Id { get; set; }
        public string password { get; set; }
        public string Name { get; set; }
        public List<Contact> Contacts { get; set; }
        
    }
}
