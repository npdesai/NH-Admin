using Admin.Models.DTOs;
using Admin.Models.Entities;
using Admin.Repository.Interfaces;
using Admin.Services.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Services.Services
{
    public class CarouselService : ICarouselService
    {
        private readonly ICarouselRepository _carouselRepository;
        private readonly IMapper _mapper;

        public CarouselService(ICarouselRepository carouselRepository, IMapper mapper)
        {
            _carouselRepository = carouselRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddCarousel(AddCarouselRequestDto request)
        {
            return await _carouselRepository.AddCarousel(_mapper.Map<Carousel>(request));
        }

        public async Task<List<CarouselDto>> GetCarousels()
        {
            var carousels = await _carouselRepository.GetCarousels();

            return _mapper.Map<List<CarouselDto>>(carousels);
        }
    }
}
