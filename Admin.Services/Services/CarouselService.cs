using Admin.Models.DTOs;
using Admin.Models.Entities;
using Admin.Repository.Interfaces;
using Admin.Services.Interfaces;
using AutoMapper;
using System;
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

        public async Task<bool> UpdateCarouselActiveStatus(Guid id, bool isActive)
        {
            try
            {
                var carousel = await _carouselRepository.GetCarouselById(id);
                carousel.IsActive = isActive;
                return await _carouselRepository.UpdateCarouselActiveStatus(carousel);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CarouselDto> GetCarouselById(Guid id)
        {
            try
            {
                var carousel = await _carouselRepository.GetCarouselById(id);

                return _mapper.Map<CarouselDto>(carousel);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateCarousel(UpdateCarouselRequestDto updateCarouselRequest)
        {
            try
            {
                var carousel = await _carouselRepository.GetCarouselById(updateCarouselRequest.Id);
                carousel.Title = updateCarouselRequest.Title;
                carousel.Description = updateCarouselRequest.Description;
                if (!string.IsNullOrEmpty(updateCarouselRequest.Image?.Trim()))
                {
                    carousel.Image = updateCarouselRequest.Image;
                }
                carousel.IsActive = updateCarouselRequest.IsActive;
                return await _carouselRepository.UpdateCarousel(carousel);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
