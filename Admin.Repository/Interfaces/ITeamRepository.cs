using Admin.Models.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Repository.Interfaces
{
    public interface ITeamRepository
    {
        Task<bool> AddTeam(Team team);
        Task<List<Team>> GetTeams(bool? isActive, bool? isDelete);
        Task<bool> UpdateTeamActiveStatus(Team team);
        Task<Team> GetTeamById(Guid id);
        Task<bool> UpdateTeam(Team team);
        Task<bool> UpdateTeamDeleteStatus(Team team);
    }
}
