using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using hackhathonTarnow.Code.Crypt;
using hackhathonTarnow.Context;
using hackhathonTarnow.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hackhathonTarnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private MySqlContext _context { get; set; }

        public UsersController(MySqlContext context)
        {
            _context = context;
        }


        [HttpPut]
        [Authorize(Roles = "user")]
        public async Task<ActionResult<HttpResponseMessage>> EditData([FromBody] User users)
        {
            try
            {
                var crypt = new CryptPassword();
                User userDb = await _context.Users.Where(u => u.Id == users.Id).FirstOrDefaultAsync();
                userDb.Name = users.Name;
                userDb.Surname = users.Surname;
                userDb.Password = crypt.EncodeText(users.Password);
                userDb.PhoneNumber = users.PhoneNumber;
                userDb.UpdatedDate = DateTime.Now;

                _context.Users.Update(userDb);
                await _context.SaveChangesAsync();
                return Ok("Udało się zaktualizować dane użytkownika");
            }

            catch (Exception e)
            {
                var objectError = new
                {
                    User = "Wystąpił błąd podczas aktualizacji danych",
                    Error = e
                };
                return Conflict(objectError);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "user")]
        public async Task<ActionResult<HttpResponseMessage>> DeleteUser()
        {
            Guid userId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            _context.Users.Remove(user);
            return Ok("Użytkownik został usunięty");
        }

        [HttpGet]
        [Authorize]
        public async Task<User> GetUsersAsync()
        {
            try
            {
                Guid userId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
                return user;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}