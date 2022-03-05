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
            CreateMap<AddTeamRequestDto, Team>().ReverseMap();
            CreateMap<Team, TeamDto>().ReverseMap();
            CreateMap<AddClientRequestDto, Client>().ReverseMap();
            CreateMap<Client, ClientDto>().ReverseMap();
        }
    }
}
