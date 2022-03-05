using Admin.Models.Entities;
using Admin.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Admin.Repository.Repositories
{
    public class TeamRepository : ITeamRepository
    {
        private readonly AdminDBContext _dbContext;

        public TeamRepository(AdminDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddTeam(Team team)
        {
            try
            {
                team.CreatedAt = DateTime.Now;
                team.UpdatedAt = DateTime.Now;
                await _dbContext.Teams.AddAsync(team);

                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateTeam(Team team)
        {
            try
            {
                team.UpdatedAt = DateTime.Now;
                _dbContext.Entry(team).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateTeamActiveStatus(Team team)
        {
            try
            {
                team.UpdatedAt = DateTime.Now;
                _dbContext.Entry(team).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Team>> GetTeams(bool? isActive, bool? isDelete)
        {
            if (isActive.HasValue && isDelete.HasValue)
            {
                return await _dbContext.Teams.Where(t => t.IsActive == isActive && t.IsDelete == isDelete).ToListAsync();
            }
            else if (isActive.HasValue)
            {
                return await _dbContext.Teams.Where(t => t.IsActive == isActive).ToListAsync();
            }
            else if (isDelete.HasValue)
            {
                return await _dbContext.Teams.Where(t => t.IsDelete == isDelete).ToListAsync();
            }
            else
            {
                return await _dbContext.Teams.ToListAsync();
            }
        }

        public async Task<Team> GetTeamById(Guid id)
        {
            return await _dbContext.Teams.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> UpdateTeamDeleteStatus(Team team)
        {
            try
            {
                team.UpdatedAt = DateTime.Now;
                _dbContext.Entry(team).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
