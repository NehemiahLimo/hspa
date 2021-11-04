using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webAPI.Data.DTO;
using webAPI.Data.Interfaces;
using webAPI.Data.Repo;
using webAPI.Models;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController( IUnitOfWork uow, IMapper mapper )
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await uow.CityRepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);
            //var citiesDto = from c in cities
            //                select new CityDto()
            //                {
            //                    Id = c.Id,
            //                    Name = c.Name
            //                };

            return Ok(citiesDto);   
        }

        //api/addcity
        
        //post /api/city/add?city=Nairobi

        [HttpPost("addcity")]
        [HttpPost("post")]
        [HttpPost("addcity/{cityname}")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            city.LastUpdate = DateTime.Now;
            city.LastUpdatedBy = 1;

            /*var city = new City
            {
                Name = cityDto.Name,
                LastUpdate = DateTime.Now,
                LastUpdatedBy = 1
            };*/


            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
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
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            /*var city = await db.Cities.FindAsync(id);
            db.Cities.Remove(city);
            await db.SaveChangesAsync();*/
            return StatusCode(200);
        }

    }
}
