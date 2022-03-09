using Admin.Attributes;
using Admin.Models.DTOs;
using Admin.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class CarouselController : ControllerBase
    {
        private readonly ICarouselService _carouselService;

        public CarouselController(ICarouselService carouselService)
        {
            _carouselService = carouselService;
        }

        /// <summary>
        /// Add Carousel
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("api/carousel/add")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AddCarousel([FromBody] AddCarouselRequestDto request)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _carouselService.AddCarousel(request);
                response.Success = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;

                return BadRequest(response);
            }
        }

        /// <summary>
        /// Get Carousel List
        /// </summary>
        /// <param name="isActive"></param>
        /// <returns></returns>
        [HttpGet("api/carousel/list")]
        [ProducesResponseType(typeof(ResponseDto<List<CarouselDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<List<CarouselDto>>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<List<CarouselDto>>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetCarousels(bool? isActive)
        {
            ResponseDto<List<CarouselDto>> response = new();
            try
            {
                response.Data = await _carouselService.GetCarousels(isActive);
                response.Success = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;

                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update Carousel Active Status
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("api/carousel/update/{id}")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateCarouselActiveStatus(Guid id, bool isActive)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _carouselService.UpdateCarouselActiveStatus(id, isActive);
                response.Success = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;

                return BadRequest(response);
            }
        }

        /// <summary>
        /// Get Carousel By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("api/carousel/{id}")]
        [ProducesResponseType(typeof(ResponseDto<CarouselDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<CarouselDto>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<CarouselDto>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<CarouselDto>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetCarouselById(Guid id)
        {
            ResponseDto<CarouselDto> response = new();
            try
            {
                response.Data = await _carouselService.GetCarouselById(id);
                response.Success = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;

                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update Carousel
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("api/carousel/update")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateCarousel(UpdateCarouselRequestDto request)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _carouselService.UpdateCarousel(request);
                response.Success = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;

                return BadRequest(response);
            }
        }
    }
}
