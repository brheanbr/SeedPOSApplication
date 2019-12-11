using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.API.Data;
using Seed.API.Dtos;

namespace Seed.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class POSController : ControllerBase
    {
        private readonly IPOSRepository _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public POSController(IPOSRepository repo, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{username}/{id}", Name = "GetComapany")]
        public async Task<IActionResult> GetCompany(string username, int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) && username != User.FindFirst(ClaimTypes.Name).Value)
                return Unauthorized();

            var company = await _repo.GetCompany(id);
            var userToReturn = _mapper.Map<CompanyToReturnDto>(company);
            
            return Ok(userToReturn);

        }

    }
}