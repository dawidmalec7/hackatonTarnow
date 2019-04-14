using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using hackhathonTarnow.Code.Crypt;
using hackhathonTarnow.Context;
using hackhathonTarnow.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace hackhathonTarnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private MySqlContext _context { get; set; }
        public RegisterController(MySqlContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<HttpResponseMessage>> UserRegister([FromBody] User user)
        {
            var crypt = new CryptPassword();
            user.Password = crypt.EncodeText(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok("Rejestracja przebiegła pomyślnie");
        }

    }
}