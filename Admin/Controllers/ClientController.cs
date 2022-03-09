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
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        /// <summary>
        /// Add Client
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("api/client/add")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AddClient([FromBody] AddClientRequestDto request)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _clientService.AddClient(request);
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
        /// Get Client List
        /// </summary>
        /// <param name="isActive"></param>
        /// <param name="isDelete"></param>
        /// <returns></returns>
        [HttpGet("api/client/list")]
        [ProducesResponseType(typeof(ResponseDto<List<ClientDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<List<ClientDto>>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<List<ClientDto>>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetClients(bool? isActive, bool? isDelete)
        {
            ResponseDto<List<ClientDto>> response = new();
            try
            {
                response.Data = await _clientService.GetClients(isActive, isDelete);
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
        /// Update Client Active Status
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("api/client/update/{id}")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateClientActiveStatus(Guid id, bool isActive)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _clientService.UpdateClientActiveStatus(id, isActive);
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
        /// Get Client By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("api/client/{id}")]
        [ProducesResponseType(typeof(ResponseDto<ClientDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<ClientDto>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<ClientDto>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<ClientDto>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetClientById(Guid id)
        {
            ResponseDto<ClientDto> response = new();
            try
            {
                response.Data = await _clientService.GetClientById(id);
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
        /// Update Client
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("api/client/update")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateClient(UpdateClientRequestDto request)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _clientService.UpdateClient(request);
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
        /// Update Client Delete Status
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isDelete"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("api/client/delete/{id}")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateClientDeleteStatus(Guid id, bool isDelete)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _clientService.UpdateClientDeleteStatus(id, isDelete);
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
