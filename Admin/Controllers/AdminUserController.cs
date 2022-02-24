using Admin.Models.DTOs;
using Admin.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class AdminUserController : ControllerBase
    {
        private readonly IAdminUserService _adminUserService;

        public AdminUserController(IAdminUserService adminUserService)
        {
            _adminUserService = adminUserService;
        }

        /// <summary>
        /// Admin Login
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("api/admin/login")]
        [ProducesResponseType(typeof(ResponseDto<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<string>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<string>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AdminLogin([FromBody] AdminLoginRequestDto request)
        {
            ResponseDto<string> response = new();
            try
            {
                response.Data = await _adminUserService.AdminLogin(request.Username, request.Password);
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
