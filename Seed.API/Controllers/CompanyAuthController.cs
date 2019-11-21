using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Seed.API.Data;
using Seed.API.Dtos;

namespace Seed.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyAuthController : ControllerBase
    {
        private readonly ICompanyRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public CompanyAuthController(ICompanyRepository repo, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;

        }
        [HttpPost("login")]
                public async Task<IActionResult> Login(CompanyForLoginDto companyForLoginDto)
            {
                if(companyForLoginDto.Username == null || companyForLoginDto.Password == null)
                    return BadRequest("Please login username and password!");
                var companyFromRepo = await _repo.Login(companyForLoginDto.Username.ToLower(), companyForLoginDto.Password);   

                if (companyFromRepo == null)
                    return BadRequest("Wrong username or passwords!");

                var claims = new[]{
                    new Claim(ClaimTypes.NameIdentifier, companyFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Surname, companyFromRepo.CompanyOwner),
                    new Claim(ClaimTypes.Name, companyFromRepo.CompanyName)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(3),
                    SigningCredentials = creds
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return Ok(new
                {
                    token = tokenHandler.WriteToken(token),
                });
            }
    
    }
}