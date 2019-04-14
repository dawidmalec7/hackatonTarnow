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
using Microsoft.EntityFrameworkCore;

namespace hackhathonTarnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private MySqlContext _context { get; set; }
        public LoginController(MySqlContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<HttpResponseMessage>> Login([FromBody] User user) {
            try
            {
                User dbUser = await _context.Users.Where(u => u.Email == user.Email).FirstOrDefaultAsync();
                if (dbUser == null) return Conflict("Użytkownik o takim adresie email nie istnieje");
                var crypt = new CryptPassword();
                if (dbUser.Password != crypt.EncodeText(user.Password)) return Conflict("Niepoprawne hasło, spróbuj ponownie");

                return Ok(GenerateToken(dbUser));
            }
            catch(Exception e)
            {
                return null;
            }
        }

        private object GenerateToken(User user)
        {
            return null;
        }
    }
}