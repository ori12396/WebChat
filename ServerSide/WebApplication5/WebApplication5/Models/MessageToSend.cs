namespace WebApplication5.Models
{
    public class MessageToSend
    {
        public int Id { get; set; }
        public string content { get; set; }   
       
        public string created { get; set; }
        public bool sent { get; set; }

    }
}
