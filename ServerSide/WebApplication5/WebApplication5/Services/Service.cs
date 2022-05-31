using WebApplication5.Models;

namespace WebApplication5.Services
{
    public class Service : IService
    {
        /*
        Message m1 = new Message() { Id = 1000, Text = "hi", Time = "13:00", Date = "25/5/2020", sent = true };
        Message m2 = new Message() { Id = 2000, Text = "hi2", Time = "13:01", Date = "5/5/2021", sent = false };
        List<Message> messages, messages1, messages2;
        private Contact c1;
        private Contact c2;
        private Contact c3,c4;
        User usr1, usr2,usr3,usr4;
        private static List<Contact> contacts1 = new List<Contact>() { };
        private static List<Contact> contacts2 = new List<Contact>() { };
        private static List<Contact> contact3 = new List<Contact>();*/
        private static List<User> users = new List<User>();
        int msgId = 0;
        public Service()
        {
            /*
            messages = new List<Message>() { m1, m2 };
            messages1 = new List<Message>() { m1};
            messages2 = new List<Message>() { m1 ,m1 ,m1 ,m1 ,m2 ,m1 ,m2 ,m2};
            c1 = new Contact() { Id = "ori", Name = "ori", messages = messages, Server = "here" };
            c2 = new Contact() { Id = "simon", Name = "simon", messages = new List<Message>(), Server = "here" };
            c3 = new Contact() { Id = "yossi", Name = "yossi", Server = "not here", messages = messages2 };
            c4 = new Contact() { Id = "adi", Name = "adi", messages = new List<Message>(), Server = "here" };
            contacts1.Add(c1);
            contacts1.Add(c2);
            contact3.Add(c4);
            usr1 = new User() { Id = "adi", Name = "adi", Contacts = contacts1, password = "123" };
            usr3=new User() { Id = "simon",Name="simon",Contacts=contact3, password = "123"};
            usr4 = new User() { Id = "yossi", Name = "yossi", Contacts = new List<Contact>(), password = "123" };
            contacts2.Add(c1);
            contacts2.Add(c2);
            contacts2.Add(c3);
            usr2 = new User() { Id = "shimrit", Name = "shimrit", Contacts = contacts2, password = "123" };
            users.Add(usr1);
            users.Add(usr2);
            users.Add(usr3);
            users.Add(usr4);*/

        }
        public User getUser(string userId)
        {
            return users.Find(u => u.Id.CompareTo(userId) == 0);
        }
        public Contact getContact(string userId, string id)
        {
            return getUser(userId).Contacts.Find(c => c.Id.CompareTo(id) == 0);
        }
        public List<ContactToSend> GetAllContacts(string userId)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            var contacts = new List<ContactToSend>();
            foreach (var contact in user.Contacts)//create the contactToSeND
            {
                if (contact.messages.Count != 0)
                    contact.updateLast();
                contacts.Add(new ContactToSend() { id = contact.Id, name = contact.Name, server = contact.Server, last = contact.last, lastdate = contact.lastdate });
            }


            return contacts;

        }
        public ContactToSend GetByUser(string userId, string id)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact contact = user.Contacts.Find(c => c.Id.CompareTo(id) == 0);
            if (contact.messages.Count != 0)
                contact.updateLast();
            ContactToSend send = new ContactToSend() { id = contact.Id, name = contact.Name, server = contact.Server, last = contact.last, lastdate = contact.lastdate };
            return send;
        }

        public bool Create(string userId, Contact contactToAdd)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact contact = user.Contacts.Find(c => c.Id.CompareTo(contactToAdd.Id) == 0);
            if (contact != null)
            {
                return false;
            }
            contact = new Contact();
            contact.Id = contactToAdd.Id;
            contact.Server = contactToAdd.Server;
            contact.Name = contactToAdd.Name;
            contact.messages = new List<Message>();
            user.Contacts.Add(contact);
            return true;
        }
        public void Update(string userId, string id, Contact contact)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact c = user.Contacts.Find(x => x.Id.CompareTo(id) == 0);
            //update the values.
            contact.Id = c.Id;
            if (c.messages != null)
                c.updateLast();
            contact.lastdate = c.lastdate;
            contact.last = c.last;
            contact.messages = c.messages;
            user.Contacts.Remove(c);
            user.Contacts.Add(contact);
        }
        public void Delete(string userId, string id)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact c = user.Contacts.Find(x => x.Id.CompareTo(id) == 0);
            user.Contacts.Remove(c);
        }
        public List<MessageToSend> MessagesRet(string userId, string id)//this function return the current contact msg
        {
            List<MessageToSend> messages = new List<MessageToSend>();
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact c = user.Contacts.Find(x => x.Id.CompareTo(id) == 0);
            List<Message> m = c.messages;
            foreach (Message msg in m)//creating the msgtosend
            {
                MessageToSend mts = new MessageToSend();
                mts.Id = msg.Id;
                mts.sent = msg.sent;
                mts.content = msg.Text;
                mts.created =msg.Date+ ": " + msg.Time;
                messages.Add(mts);
            }
            return messages;
        }
        public void newMsg(string userId, string id, string content, bool from)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact c = user.Contacts.Find(x => x.Id.CompareTo(id) == 0);
            Message msg = new Message();
            msg.Text = content;
            msg.sent = from;
            this.msgId = this.msgId + 1;
            msg.Id = msgId;
            DateTime now = DateTime.Now;
            DateTime today = DateTime.Today;
            msg.Time = now.ToString("h:mm");
            msg.Date = today.ToString("d");
            c.messages.Add(msg);
        }
        public MessageToSend specificMsg(string userId, string id, int messageId)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact c = user.Contacts.Find(x => x.Id.CompareTo(id) == 0);
            Message m = c.messages.Find(x => x.Id == messageId);
            if (m != null)
            {
                MessageToSend msg = new MessageToSend();
                msg.Id = m.Id;
                msg.sent = m.sent;
                msg.content = m.Text;
                msg.created = m.Date;
                return msg;
            }
            return null;
        }
        public bool editMsg(string userId, string id, int messageId, string content)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact c = user.Contacts.Find(x => x.Id.CompareTo(id) == 0);
            Message m = c.messages.Find(x => x.Id == messageId);
            if (m != null)
            {
                m.Text = content;
                return true;
            }
            return false;
        }
        public bool deleteMsg(string userId, string id, int messageId)
        {
            User user = users.Find(u => u.Id.CompareTo(userId) == 0);
            Contact c = user.Contacts.Find(x => x.Id.CompareTo(id) == 0);
            Message m = c.messages.Find(x => x.Id == messageId);
            if (m != null)
            {
                c.messages.Remove(m);
                return true;
            }
            return false;
        }
        public bool Invitations(invitations invitation)
        {
            string from = invitation.from;
            string to = invitation.to;
            string server = invitation.server;
            User user = users.Find(u => u.Id.CompareTo(to) == 0);
            if (user == null)
                return false;
            Contact contact = user.Contacts.Find(x => x.Id.CompareTo(from) == 0);
            if (contact == null)
            {
                contact = new Contact();
                contact.Id = from;
                contact.Name = from;
                contact.Server = server;
                contact.messages = new List<Message>();
                user.Contacts.Add(contact);
            }
            return true;

        }
        public bool addMsg(Transfer transfer)
        {
            string from = transfer.from;
            string to = transfer.to;
            string content = transfer.content;
            User user = users.Find(u => u.Id.CompareTo(to) == 0);
            if (user == null)
                return false;
            Contact contact = user.Contacts.Find(x => x.Id.CompareTo(from) == 0);
            if (contact == null)
            {
                return false;// אולי צריך ליצור פה את האיש קשר !!!!
            }
            newMsg(to, from, content, false);
            return true;
        }
        public bool register(Register register)
        {
            User user = users.Find(u => u.Id.CompareTo(register.id) == 0);
            if (user != null)
                return false;
            user=new User();
            user.Id = register.id;
            user.password = register.password;
            user.Name = register.nickname;
            user.Contacts = new List<Contact>();
            users.Add(user);
            return true;
        }
        public bool login(Login login)
        {
            User user = users.Find(u => u.Id.CompareTo(login.id) == 0);
            if  (user ==null)
                return false;
            if (user.password != login.password)
                return false;
            return true;
        }
    }
}
