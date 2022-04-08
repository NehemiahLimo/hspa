using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webAPI.Data.DTO;
using webAPI.Data.Interfaces;
using webAPI.Models;

namespace webAPI.Controllers
{
   
    public class PropertiesController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertiesController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("getproperties/{sellRent}")]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var data = await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertyListDto = mapper.Map<IEnumerable<PropertyListDTO>>(data);
            return Ok(propertyListDto);
        }

        [HttpGet("data/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyData(int id)
        {
            var data = await uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyDto = mapper.Map<PropertyDetailDTO>(data);
            return Ok(propertyDto);
        }

        [HttpPost("add_data")]
        [AllowAnonymous]
        public async Task<IActionResult> AddProperty(PropertyDTO propertydto)
        {
            var property = mapper.Map<Property>(propertydto);//, await uow.PropertyRepository.AddProperty(property);
            property.PostedBy = 2;
            property.LastUpdatedBy = 2;
            uow.PropertyRepository.AddProperty(property);
            await uow.SaveAsync();
            return StatusCode(201);

        }
    }
}
