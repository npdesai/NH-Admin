using Admin.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Services.Interfaces
{
    public interface ITeamService
    {
        Task<bool> AddTeam(AddTeamRequestDto request);
        Task<List<TeamDto>> GetTeams(bool? isActive, bool? isDelete);
        Task<bool> UpdateTeamActiveStatus(Guid id, bool isActive);
        Task<TeamDto> GetTeamById(Guid id);
        Task<bool> UpdateTeam(UpdateTeamRequestDto updateTeamRequest);
        Task<bool> UpdateTeamDeleteStatus(Guid id, bool isDelete);
    }
}
