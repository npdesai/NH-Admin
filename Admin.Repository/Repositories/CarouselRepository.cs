﻿using Admin.Models.Entities;
using Admin.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Repository.Repositories
{
    public class CarouselRepository : ICarouselRepository
    {
        private readonly AdminDBContext _dbContext;

        public CarouselRepository(AdminDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddCarousel(Carousel carousel)
        {
            try
            {
                carousel.CreatedAt = DateTime.Now;
                carousel.UpdatedAt = DateTime.Now;
                await _dbContext.Carousels.AddAsync(carousel);

                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Carousel>> GetCarousels()
        {
            return await _dbContext.Carousels.ToListAsync();
        }
    }
}
