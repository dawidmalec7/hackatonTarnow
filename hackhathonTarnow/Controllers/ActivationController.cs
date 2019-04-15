using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using hackhathonTarnow.Context;
using hackhathonTarnow.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hackhathonTarnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivationController : ControllerBase
    {
        private MySqlContext _context { get; set; }

        public ActivationController(MySqlContext context)
        {
            _context = context;
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<HttpResponseMessage>> ActivateAccount([FromRoute] Guid id)
        {
            User user = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
            if (user.IsActivated) return Ok("Konto zostało już aktywowane");
            if (user.ActivationDate < DateTime.Now) return Conflict("Minął czas na aktywacje konta :(");
            user.IsActivated = true;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok("Konto zostało aktywowane");
        }
    }
}