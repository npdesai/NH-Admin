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
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IMapper _mapper;

        public TeamService(ITeamRepository teamRepository, IMapper mapper)
        {
            _teamRepository = teamRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddTeam(AddTeamRequestDto request)
        {
            return await _teamRepository.AddTeam(_mapper.Map<Team>(request));
        }

        public async Task<List<TeamDto>> GetTeams(bool? isActive, bool? isDelete)
        {
            var teams = await _teamRepository.GetTeams(isActive, isDelete);

            return _mapper.Map<List<TeamDto>>(teams);
        }

        public async Task<bool> UpdateTeamActiveStatus(Guid id, bool isActive)
        {
            try
            {
                var team = await _teamRepository.GetTeamById(id);
                team.IsActive = isActive;
                return await _teamRepository.UpdateTeamActiveStatus(team);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TeamDto> GetTeamById(Guid id)
        {
            try
            {
                var team = await _teamRepository.GetTeamById(id);

                return _mapper.Map<TeamDto>(team);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateTeam(UpdateTeamRequestDto updateTeamRequest)
        {
            try
            {
                var team = await _teamRepository.GetTeamById(updateTeamRequest.Id);
                team.Title = updateTeamRequest.Title;
                team.Details = updateTeamRequest.Details;
                if (!string.IsNullOrEmpty(updateTeamRequest.Image?.Trim()))
                {
                    team.Image = updateTeamRequest.Image;
                }
                team.IsActive = updateTeamRequest.IsActive;
                return await _teamRepository.UpdateTeam(team);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateTeamDeleteStatus(Guid id, bool isDelete)
        {
            try
            {
                var team = await _teamRepository.GetTeamById(id);
                team.IsDelete = isDelete;
                return await _teamRepository.UpdateTeamDeleteStatus(team);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
