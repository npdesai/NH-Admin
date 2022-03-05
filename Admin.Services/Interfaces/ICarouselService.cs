using Admin.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Services.Interfaces
{
    public interface ICarouselService
    {
        Task<bool> AddCarousel(AddCarouselRequestDto request);
        Task<List<CarouselDto>> GetCarousels(bool? isActive);
        Task<bool> UpdateCarouselActiveStatus(Guid id, bool isActive);
        Task<CarouselDto> GetCarouselById(Guid id);
        Task<bool> UpdateCarousel(UpdateCarouselRequestDto updateCarouselRequest);
    }
}
