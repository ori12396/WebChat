using WebApplication5.Models;

namespace WebApplication5.Services
{
    public interface IService
    {
        public List<ContactToSend> GetAllContacts(string UserId);
        public ContactToSend GetByUser(string UserId,string id);
        public void Delete(string UserId, string id);
        public void Update(string UserId, string id ,Contact contact);
        public bool Create(string UserId, Contact contact);
        public List<MessageToSend> MessagesRet(string userId, string id);
        public User getUser(string userId);
        public Contact getContact(string userId, string id);
        public void newMsg(string userId, string id,string content,bool from);
        public MessageToSend specificMsg(string userId, string id,int messageId);
        public bool editMsg(string userId, string id,int messageId, string content);
        public bool deleteMsg(string userId, string id, int messageId);
        public bool Invitations(invitations invitation);
        public bool addMsg(Transfer transfer);
        public bool register(Register register);
        public bool login(Login login);
    }
}
