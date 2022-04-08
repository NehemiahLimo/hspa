using AutoMapper;
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
            CreateMap<Property, PropertyDTO>().ReverseMap();
            CreateMap<Property, PropertyListDTO>()
                .ForMember(x => x.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(x => x.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
                .ForMember(x => x.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(x => x.Country, opt => opt.MapFrom(src => src.City.Country));
           
            
            CreateMap<Property, PropertyDetailDTO>()
                .ForMember(x => x.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(x => x.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
                .ForMember(x => x.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(x => x.Country, opt => opt.MapFrom(src => src.City.Country));

            CreateMap<FurnishingType, KeyValuePairDto>();

            CreateMap<PropertyType, KeyValuePairDto>();

        }
    }
}
