using System;
using System.Collections.Generic;
using System.Linq;
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
    public class SpacesController : ControllerBase
    {
        private MySqlContext _context { get; set; }

        public SpacesController(MySqlContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IEnumerable<Space>> GetSpacesAsync([FromRoute] Guid id)
        {
            var spaces = await _context.Parkings.Where(p => p.Id == id).Include(p => p.Spaces).Select(p => p.Spaces).FirstOrDefaultAsync();
            return spaces;
        }
    }
}