using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using hackhathonTarnow.Code.Crypt;
using hackhathonTarnow.Context;
using hackhathonTarnow.Email.EmailController;
using hackhathonTarnow.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace hackhathonTarnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private MySqlContext _context { get; set; }
        private IConfiguration _configuration { get; set; }
        public RegisterController(MySqlContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult<HttpResponseMessage>> UserRegister([FromBody] User user)
        {
            try
            {
                User dbUser = _context.Users.Where(u => u.Email == user.Email).FirstOrDefault();
                if (dbUser != null) return Conflict("Użytkownik o takim adresie email już istnieje");
                var crypt = new CryptPassword();
                user.Role = "user";
                user.Password = crypt.EncodeText(user.Password);
                user.CreatedDate = DateTime.Now;
                user.ActivationDate = DateTime.Now.AddMinutes(60);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                var userId = await _context.Users.Where(u => u.Email == user.Email).Select(e => e.Id).FirstOrDefaultAsync();

                try
                {
                    var email = new EmailController();
                    email.SendEmail(user.Email, "aktywacja konta", userId);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                return Ok("Rejestracja przebiegła pomyślnie, na email wysłano potwierdzenie rejestracji");
            }
            catch (Exception e)
            {
                return Conflict(e);
            }
        }
    }
}