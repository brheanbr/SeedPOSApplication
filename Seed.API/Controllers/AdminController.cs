using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.API.Data;
using Seed.API.Dtos;
using Seed.API.Models;

namespace Seed.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAdminRepository _repo;
        private readonly IMapper _mapper;
        public AdminController(IAdminRepository repo, DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            _context = context;

        }

        // [HttpPost("subscribe")]
        // public async Task<IActionResult> Subscribe(SubsToCreate substoCreateDto)
        // {
        //     if (await _repo.IsSubscribed(substoCreateDto.CompanyId))
        //         return BadRequest("Already Subscribed");
        //     var subsToCreate = _mapper.Map<Subscription>(substoCreateDto);
        //     subsToCreate.SubscriptionStart = DateTime.Today;
        //     await _repo.Subscribe(subsToCreate);
        //     return NoContent();
        // }

        [HttpGet("companies")]
        public async Task<IActionResult> GetCompanies()
        {
            var companies = await _repo.GetCompanies();
            var companiesToReturn = _mapper.Map<IEnumerable<CompanyToReturnDto>>(companies);
            return Ok(companiesToReturn);
        }

        [HttpGet("company/{id}")]
        public async Task<IActionResult> GetCompany(int id)
        {
            var company = await _repo.GetCompany(id);
            var companiesToReturn = _mapper.Map<CompanyToReturnDto>(company);
            return Ok(companiesToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var companyFromRepo = await _repo.GetCompany(id);
            if(companyFromRepo != null)
            {
                _repo.Delete(companyFromRepo);
            }
            if(await _repo.SaveAll())
                return Ok();
            return BadRequest("Failed to delete company");
            
        }

        // [HttpGet("employees")]
        // public async Task<IActionResult> GetEmployees(int CompanyId)
        // {
        //     //var company = await _repo.GetSubscription(CompanyId);
        //     var employees = await _repo.GetEmployees();
        //     return Ok(employees);
        // }


    }
}