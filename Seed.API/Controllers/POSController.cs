using System.Security.Claims;
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
    public class POSController : ControllerBase
    {
        private readonly IPOSRepository _repo;
        private readonly IMapper _mapper;

        public POSController(IPOSRepository repo, IMapper mapper)
        {
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
            //new CompanyDataContext(userToReturn.Subscription.ConnectionString);
            return Ok(userToReturn);
        }

        [HttpPost("cashier-login")]
        public async Task<IActionResult> CashierLogin(CashierForLoginDto cashierForLogin)
        {
            if(cashierForLogin.Username == null || cashierForLogin.Password == null)
                return BadRequest("Please login Username and Password!");
            if(int.Parse(cashierForLogin.CompanyId) != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var cashierFromRepo = await _repo.CashierLogin(cashierForLogin.Username, cashierForLogin.Password, int.Parse(cashierForLogin.CompanyId));
            if(cashierFromRepo == null)
                return BadRequest("Wrong Username or Password!");

            var cashier = _mapper.Map<EmployeesToReturnDto>(cashierFromRepo);
            return Ok(new{cashier});
        }

        [HttpPost("make-order")]
        public async Task<IActionResult> MakeOrder(OrderToCreateDto orderToCreate)
        {
            var order = _mapper.Map<Order>(orderToCreate);
            var createdOrder = await _repo.MakeOrder(order);
            return Ok(createdOrder);
        }

    }
}