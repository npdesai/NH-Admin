using Admin.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Admin.Services.Interfaces
{
    public interface IClientService
    {
        Task<bool> AddClient(AddClientRequestDto request);
        Task<List<ClientDto>> GetClients(bool? isActive, bool? isDelete);
        Task<bool> UpdateClientActiveStatus(Guid id, bool isActive);
        Task<ClientDto> GetClientById(Guid id);
        Task<bool> UpdateClient(UpdateClientRequestDto updateClientRequest);
        Task<bool> UpdateClientDeleteStatus(Guid id, bool isDelete);
    }
}
