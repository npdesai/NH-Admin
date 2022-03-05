using Admin.Models.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Repository.Interfaces
{
    public interface ICarouselRepository
    {
        Task<bool> AddCarousel(Carousel carousel);
        Task<List<Carousel>> GetCarousels(bool? isActive);
        Task<bool> UpdateCarouselActiveStatus(Carousel carousel);
        Task<Carousel> GetCarouselById(Guid id);
        Task<bool> UpdateCarousel(Carousel carousel);
    }
}
