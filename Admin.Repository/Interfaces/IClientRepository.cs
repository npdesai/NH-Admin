using Admin.Models.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Repository.Interfaces
{
    public interface IClientRepository
    {
        Task<bool> AddClient(Client client);
        Task<List<Client>> GetClients(bool? isActive, bool? isDelete);
        Task<bool> UpdateClientActiveStatus(Client client);
        Task<Client> GetClientById(Guid id);
        Task<bool> UpdateClient(Client client);
        Task<bool> UpdateClientDeleteStatus(Client client);
    }
}
