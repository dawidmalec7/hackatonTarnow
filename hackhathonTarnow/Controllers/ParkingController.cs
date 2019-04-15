using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using hackhathonTarnow.Context;
using hackhathonTarnow.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hackhathonTarnow.Email.EmailController;

namespace hackhathonTarnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private MySqlContext _context { get; set; }
        public ParkingController(MySqlContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<HttpResponseMessage>> ParkingCreate([FromBody] Parking parking)
        {
            parking.Spaces = new List<Space>();
            for(int i = 0; i<parking.NumberOfPlaces; i++)
            {
                parking.Spaces.Add(new Space
                {
                    IsBusy = false
                });
            }
            _context.Parkings.Add(parking);
     
            await _context.SaveChangesAsync();
            return Ok("Dodano Parking");
        }
        [HttpGet]
        public async Task<IEnumerable<Parking>> GetParking()
        {
            var parking = await _context.Parkings.Include(p => p.Spaces).ToListAsync();
            return parking;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<HttpResponseMessage>> GetParking([FromRoute] Guid Id)
        {
            var parking = await _context.Parkings.Where(p => p.Id == Id).FirstOrDefaultAsync();
            return Ok(parking);
        }

        [HttpPost] 
        [Route("{id}")]
        public async Task<ActionResult<HttpResponseMessage>> BuyPlace([FromRoute] Guid id, [FromBody] ParkingHistory parkingHistory)
        {

            parkingHistory.StartTime = DateTime.Now;
            parkingHistory.EndTime = DateTime.Now.AddHours(parkingHistory.HowLong);
            parkingHistory.ParkingId = id;
            parkingHistory.UserId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var parking = await _context.Parkings.Where(p => p.Id == id).FirstOrDefaultAsync();
            parking.NumberOfFreeCarsPlaces--;
            _context.Parkings.Update(parking);
            _context.ParkingHistories.Add(parkingHistory);
            await _context.SaveChangesAsync();
            return Ok("Wykupiono miejsce parkingowe");
        }

    }
}
