using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webAPI.Data.DTO;
using webAPI.Models;

namespace webAPI.Helpers
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto>().ReverseMap();
            //CreateMap<CityDto, City>();
            CreateMap<Property, PropertyListDTO>().
                ForMember(x => x.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(x => x.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
                .ForMember(x => x.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                 .ForMember(x => x.Country, opt => opt.MapFrom(src => src.City.Country));
        }
    }
}
