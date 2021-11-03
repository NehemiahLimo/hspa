using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webAPI.Data.Interfaces;
using webAPI.Data.Repo;
using webAPI.Models;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository repo;

        public CityController( ICityRepository repo  )
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await repo.GetCitiesAsync();
            return Ok(cities);
        }

        //api/addcity
        
        //post /api/city/add?city=Nairobi

        [HttpPost("addcity")]
        [HttpPost("post")]
        [HttpPost("addcity/{cityname}")]
        public async Task<IActionResult> AddCity(City city)
        {

             repo.AddCity(city);
            await repo.SaveAsync();
            return StatusCode(201);
        }


        [HttpGet("{id}")]
        public string getCity()
        {
            return "Nakuru";
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Deletecity(int id)
        {
            repo.DeleteCity(id);
            await repo.SaveAsync();
            /*var city = await db.Cities.FindAsync(id);
            db.Cities.Remove(city);
            await db.SaveChangesAsync();*/
            return StatusCode(200);
        }

    }
}
