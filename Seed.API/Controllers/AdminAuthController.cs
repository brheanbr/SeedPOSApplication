using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Seed.API.Data;
using Seed.API.Dtos;
using Seed.API.Models;

namespace Seed.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AdminAuthController : ControllerBase
    {
        private readonly IAdminAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;
        public AdminAuthController(IAdminAuthRepository repo, IConfiguration config, IMapper mapper, DataContext dataContext)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(AdminForRegisterDto adminForRegisterDto)
        {
            adminForRegisterDto.Username = adminForRegisterDto.Username.ToLower();
            if (await _repo.AdminUserExist(adminForRegisterDto.Username))
                return BadRequest("Username Already Exist!");

            var adminToCreate = _mapper.Map<Admin>(adminForRegisterDto);

            var createdAdmin = await _repo.RegisterAdmin(adminToCreate, adminForRegisterDto.Password);

            return Ok(createdAdmin);

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(AdminForLoginDto adminForLoginDto)
        {
            if (adminForLoginDto.Username == null || adminForLoginDto.Password == null)
                return BadRequest("Please login username and password!");
            var adminFromRepo = await _repo.Login(adminForLoginDto.Username.ToLower(), adminForLoginDto.Password);

            if (adminFromRepo == null)
                return BadRequest("Wrong username or passwords!");

            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, adminFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Surname, adminFromRepo.Name),
                new Claim(ClaimTypes.Name, adminFromRepo.AccountType)
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