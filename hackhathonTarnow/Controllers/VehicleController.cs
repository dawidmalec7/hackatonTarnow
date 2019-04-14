using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
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
    public class VehicleController : ControllerBase
    {
        private MySqlContext _context { get; set; }
        public VehicleController(MySqlContext context)
        {
            _context = context;
        }
        [HttpPost]
        
        public async Task<ActionResult<HttpResponseMessage>> VehiclesCreate([FromBody] Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();
            return Ok("Dodano pojazd");
        }
        [HttpGet]
        public async Task<IEnumerable<Vehicle>> GetVehicle()
        {
            Guid userId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var user = await _context.Users.Where(u => u.Id == userId).Include(u => u.Vehicles).FirstOrDefaultAsync();
            return user.Vehicles;
        }    
    }
}