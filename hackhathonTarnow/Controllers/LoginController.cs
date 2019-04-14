using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using hackhathonTarnow.Context;
using hackhathonTarnow.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                return null;
            }
            catch(Exception e)
            {
                return null;
            }
        }
    }
}