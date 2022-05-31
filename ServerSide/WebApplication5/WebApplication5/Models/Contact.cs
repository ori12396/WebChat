namespace WebApplication5.Models
{
    public class Contact
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Message>? messages { get; set; }
        public string Server { get; set; }  

        public string? last { get; set; }   
        public string? lastdate { get; set; }
        public void updateLast()
        {
            Message message = messages.LastOrDefault();
            last = message.Text;
            string doubledot=";";
            lastdate = message.Date+ ": " + message.Time;
        }
    }
}
