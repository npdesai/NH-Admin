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
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        private readonly IMapper _mapper;

        public ClientService(IClientRepository clientRepository, IMapper mapper)
        {
            _clientRepository = clientRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddClient(AddClientRequestDto request)
        {
            return await _clientRepository.AddClient(_mapper.Map<Client>(request));
        }

        public async Task<List<ClientDto>> GetClients(bool? isActive, bool? isDelete)
        {
            var clients = await _clientRepository.GetClients(isActive, isDelete);

            return _mapper.Map<List<ClientDto>>(clients);
        }

        public async Task<bool> UpdateClientActiveStatus(Guid id, bool isActive)
        {
            try
            {
                var client = await _clientRepository.GetClientById(id);
                client.IsActive = isActive;
                return await _clientRepository.UpdateClientActiveStatus(client);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ClientDto> GetClientById(Guid id)
        {
            try
            {
                var client = await _clientRepository.GetClientById(id);

                return _mapper.Map<ClientDto>(client);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateClient(UpdateClientRequestDto updateClientRequest)
        {
            try
            {
                var client = await _clientRepository.GetClientById(updateClientRequest.Id);
                client.Name = updateClientRequest.Name;
                client.Feedback = updateClientRequest.Feedback;
                if (!string.IsNullOrEmpty(updateClientRequest.Image?.Trim()))
                {
                    client.Image = updateClientRequest.Image;
                }
                client.IsActive = updateClientRequest.IsActive;
                return await _clientRepository.UpdateClient(client);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateClientDeleteStatus(Guid id, bool isDelete)
        {
            try
            {
                var client = await _clientRepository.GetClientById(id);
                client.IsDelete = isDelete;
                return await _clientRepository.UpdateClientDeleteStatus(client);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
