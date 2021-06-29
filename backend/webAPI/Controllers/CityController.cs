using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {

        [HttpGet("cities")]
        public IEnumerable<string> getAllCities()
        {
            return new string[] { "Nairobi", "Kijabe", "Nakuru" };
        }

    }
}
