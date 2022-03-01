using Admin.Models.DTOs;
using Admin.Models.Entities;
using AutoMapper;

namespace Admin.Models.Mapper
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<AddCarouselRequestDto, Carousel>().ReverseMap();
            CreateMap<Carousel, CarouselDto>().ReverseMap();
        }
    }
}
