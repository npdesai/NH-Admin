using Admin.Models.Entities;
using Admin.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Admin.Repository.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly AdminDBContext _dbContext;

        public ClientRepository(AdminDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddClient(Client client)
        {
            try
            {
                client.CreatedAt = DateTime.Now;
                client.UpdatedAt = DateTime.Now;
                await _dbContext.Clients.AddAsync(client);

                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateClient(Client client)
        {
            try
            {
                client.UpdatedAt = DateTime.Now;
                _dbContext.Entry(client).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateClientActiveStatus(Client client)
        {
            try
            {
                client.UpdatedAt = DateTime.Now;
                _dbContext.Entry(client).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Client>> GetClients(bool? isActive, bool? isDelete)
        {
            if (isActive.HasValue && isDelete.HasValue)
            {
                return await _dbContext.Clients.Where(t => t.IsActive == isActive && t.IsDelete == isDelete).ToListAsync();
            }
            else if (isActive.HasValue)
            {
                return await _dbContext.Clients.Where(t => t.IsActive == isActive).ToListAsync();
            }
            else if (isDelete.HasValue)
            {
                return await _dbContext.Clients.Where(t => t.IsDelete == isDelete).ToListAsync();
            }
            else
            {
                return await _dbContext.Clients.ToListAsync();
            }
        }

        public async Task<Client> GetClientById(Guid id)
        {
            return await _dbContext.Clients.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> UpdateClientDeleteStatus(Client client)
        {
            try
            {
                client.UpdatedAt = DateTime.Now;
                _dbContext.Entry(client).State = EntityState.Modified;
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
