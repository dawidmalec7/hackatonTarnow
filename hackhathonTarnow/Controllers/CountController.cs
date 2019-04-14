using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using hackhathonTarnow.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace hackhathonTarnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountController : Hub
    {
        private MySqlContext _context { get; set; }

        public CountController(MySqlContext context)
        {
            _context = context;
        }


        public Task SendNumberOfFreePlaces(int numberOfFreePlaces)
        {
            return Clients.All.SendAsync("ReceiveMessage", numberOfFreePlaces);
        }
            

    }
}