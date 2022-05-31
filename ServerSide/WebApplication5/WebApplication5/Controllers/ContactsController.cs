using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;
using WebApplication5.Models;
using WebApplication5.Services;
using SignalRChat.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace WebApplication5.Controllers
{
    [ApiController]
    [Route("api")]
    public class ContactsController : ControllerBase
    {
        private static IService _Service;
        private static IHubContext <ChatHub> Hub;
        public ContactsController(IHubContext <ChatHub> hubContext)
        {
            if (_Service == null)
            {
                _Service = new Service();
                Hub = hubContext;
            }
                
        }
        [HttpGet]
        [Route("[controller]")]
        public IActionResult Index(string userId)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            return Ok(_Service.GetAllContacts(userId));
        }
        [HttpGet]
        [Route("[controller]/{id}")]
        public IActionResult Details(string userId, string id)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            Contact contact = _Service.getContact(userId, id);
            if (contact == null)
            {
                return NotFound("Contact doesnt exist");
            }
            return Ok(_Service.GetByUser(userId, id));
        }
        [HttpPost]
        [Route("[controller]")]
        public IActionResult Create(string? userId, [Bind("Id,Name,Server")] Contact contact)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            if (ModelState.IsValid)
            {
                if (_Service.Create(userId, contact))
                    return Ok();
                return NotFound("Contact already Exist");
            }
            return NotFound("Not a valid input");

        }
        [HttpPut]
        [Route("[controller]/{id}")]
        public IActionResult Update(string userId, string id, [Bind("Id,Name,Server")] Contact contact)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            Contact c = _Service.getContact(userId, id);
            if (c == null)
            {
                return NotFound("Contact doesnt exist");
            }
            if (ModelState.IsValid)
            {
                _Service.Update(userId, id, contact);
                return Ok();
            }
            return NotFound("Not a valid input");

        }
        [HttpDelete]
        [Route("[controller]/{id}")]
        public IActionResult Delete(string userId, string id)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            Contact contact = _Service.getContact(userId, id);
            if (contact == null)
            {
                return NotFound("Contact doesnt exist");
            }

            _Service.Delete(userId, id);
            return Ok();
        }

        [HttpGet]
        [Route("[controller]/{id}/messages")]
        public IActionResult conversationHistory(string userId, string id)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            Contact contact = _Service.getContact(userId, id);
            if (contact == null)
            {
                return NotFound("Contact doesnt exist");
            }

            return Ok(_Service.MessagesRet(userId, id));
        }
        [HttpPost]
        [Route("[controller]/{id}/messages")]
        public IActionResult createNewMsg(string userId, string id, string content)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            Contact contact = _Service.getContact(userId, id);
            if (contact == null)
            {
                return NotFound("Contact doesnt exist");
            }
            _Service.newMsg(userId, id, content, true);
            return Ok();
        }
        [HttpGet]
        [Route("[controller]/{id}/messages/{id2}")]
        public IActionResult msgRet(string userId, string id, int id2)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            Contact contact = _Service.getContact(userId, id);
            if (contact == null)
            {
                return NotFound("Contact doesnt exist");
            }
            MessageToSend m = _Service.specificMsg(userId, id, id2);
            if (m == null)
                return NotFound("Message doesnt exist");
            return Ok(m);
        }
        [HttpPut]
        [Route("[controller]/{id}/messages/{id2}")]
        public IActionResult msgUpdate(string userId, string id, int id2, string content)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            Contact contact = _Service.getContact(userId, id);
            if (contact == null)
            {
                return NotFound("Contact doesnt exist");
            }
            if (_Service.editMsg(userId, id, id2, content))
                return Ok();
            return NotFound("Message doesnt exist");
        }
        [HttpDelete]
        [Route("[controller]/{id}/messages/{id2}")]
        public IActionResult delMsg(string userId, string id, int id2)
        {
            User user = _Service.getUser(userId);
            if (user == null)
            {
                return NotFound("User doesnt exist");
            }
            Contact contact = _Service.getContact(userId, id);
            if (contact == null)
            {
                return NotFound("Contact doesnt exist");
            }
            if (_Service.deleteMsg(userId, id, id2))
                return Ok();
            return NotFound("Message doesnt exist");
        }
        [HttpPost]
        [Route("invitations")]
        public async Task< IActionResult> Invite([Bind("from,to,server")] invitations invitation)
        {
            if (_Service.Invitations(invitation))
            {
                await Hub.Clients.All.SendAsync("addContact");
                return Ok();
            }
               
            return NotFound("User doesnt exist");
        }
        [HttpPost]
        [Route("transfer")]
        public async Task<IActionResult> newMsg([Bind("from,to,content")] Transfer transfer)
        {
            if (_Service.addMsg(transfer))
            {
                await Hub.Clients.All.SendAsync("reviceMsg");
                return Ok();
            }
                
            return NotFound("User doesnt exist");
        }
        [HttpPost]
        [Route("Register")]
        public IActionResult Register([Bind("id,nickname,password")] Register register)
        {
            if (_Service.register(register))
                return Ok();
            return NotFound("User already exist.");
        }
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([Bind("id,password")] Login login)
        {
            if (_Service.login(login))
                return Ok();
            return NotFound("The Id or Password are incorecct.");
        }

    }

}