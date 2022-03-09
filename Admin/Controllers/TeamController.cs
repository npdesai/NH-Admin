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
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        /// <summary>
        /// Add Team
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("api/team/add")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AddTeam([FromBody] AddTeamRequestDto request)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _teamService.AddTeam(request);
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
        /// Get Team List
        /// </summary>
        /// <param name="isActive"></param>
        /// <param name="isDelete"></param>
        /// <returns></returns>
        [HttpGet("api/team/list")]
        [ProducesResponseType(typeof(ResponseDto<List<TeamDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<List<TeamDto>>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<List<TeamDto>>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetTeams(bool? isActive, bool? isDelete)
        {
            ResponseDto<List<TeamDto>> response = new();
            try
            {
                response.Data = await _teamService.GetTeams(isActive, isDelete);
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
        /// Update Team Active Status
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("api/team/update/{id}")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateTeamActiveStatus(Guid id, bool isActive)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _teamService.UpdateTeamActiveStatus(id, isActive);
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
        /// Get Team By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("api/team/{id}")]
        [ProducesResponseType(typeof(ResponseDto<TeamDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<TeamDto>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<TeamDto>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<TeamDto>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetTeamById(Guid id)
        {
            ResponseDto<TeamDto> response = new();
            try
            {
                response.Data = await _teamService.GetTeamById(id);
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
        /// Update Team
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("api/team/update")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateTeam(UpdateTeamRequestDto request)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _teamService.UpdateTeam(request);
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
        /// Update Team Delete Status
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isDelete"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("api/team/delete/{id}")]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ResponseDto<bool?>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateTeamDeleteStatus(Guid id, bool isDelete)
        {
            ResponseDto<bool?> response = new();
            try
            {
                response.Data = await _teamService.UpdateTeamDeleteStatus(id, isDelete);
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
