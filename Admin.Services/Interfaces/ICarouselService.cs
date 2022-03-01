using Admin.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Services.Interfaces
{
    public interface ICarouselService
    {
        Task<bool> AddCarousel(AddCarouselRequestDto request);
        Task<List<CarouselDto>> GetCarousels();
    }
}
