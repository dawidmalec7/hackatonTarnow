using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using hackhathonTarnow.Code.Crypt;
using hackhathonTarnow.Context;
using hackhathonTarnow.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace hackhathonTarnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private MySqlContext _context { get; set; }
        private readonly IConfiguration _configuration;

        public LoginController(MySqlContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(issuer: "localhost:4200", audience: "localhost:4200", claims: claims, expires: DateTime.Now.AddDays(30), signingCredentials: creds);

            return Ok(new
            {
                tokenExpires = DateTime.Now.AddDays(30),
                claims,
                role = "admin",
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        private object GenerateClientToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(issuer: "localhost:44348", audience: "localhost:44348", claims: claims, expires: DateTime.Now.AddDays(30), signingCredentials: creds);

            return Ok(new
            {
                tokenExpires = DateTime.Now.AddDays(30),
                claims,
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}