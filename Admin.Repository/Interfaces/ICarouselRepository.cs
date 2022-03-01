using Admin.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Repository.Interfaces
{
    public interface ICarouselRepository
    {
        Task<bool> AddCarousel(Carousel carousel);
        Task<List<Carousel>> GetCarousels();
    }
}
