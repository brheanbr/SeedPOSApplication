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

        [HttpPost("register-company")]
        public async Task<IActionResult> RegisterCompany(CompanyForRegisterDto companyForRegisterDto)
        {
            companyForRegisterDto.CompanyUsername = companyForRegisterDto.CompanyUsername.ToLower();
            if (await _repo.CompanyUserExist(companyForRegisterDto.CompanyUsername))
                return BadRequest("Company Username Already Exist!");
            var companyToCreate = _mapper.Map<Company>(companyForRegisterDto);
            var createdCompany = await _repo.RegisterCompany(companyToCreate, companyForRegisterDto.CompanyPassword);
            var companyToReturn = _mapper.Map<CompanyToReturnDto>(createdCompany);
            return Ok(companyToReturn);
        }

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
            if(company == null)
            return BadRequest("ID Not Found!");
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

 
        // Register Product
        [HttpPost("register-product")]
        public async Task<IActionResult> RegisterProduct(ProductToCreateDto productToCreateDto)
        {  
            // var company = await _repo.GetCompany(productToCreateDto.CompanyId);
            // if(company == null) {
            //     return BadRequest("Can't Find Company");
            // }
            if(await _repo.ToRegisterProductExist(productToCreateDto.ProductName, productToCreateDto.CompanyId))
                return BadRequest("Name Already Exist");
            var productToCreate = _mapper.Map<Product>(productToCreateDto);
            var productFromRepo = await _repo.RegisterProduct(productToCreate);
            var productToReturn = _mapper.Map<ProductToReturnDto>(productFromRepo);
            return Ok(productToReturn);
        }

        //Get products by Company
        [HttpGet("products/{id}")]
        public async Task<IActionResult> GetProducts(int id)
        {
            var productsFromRepo = await _repo.GetProducts(id);
            if( productsFromRepo == null )
                return BadRequest("Can't Find Any Products");
            var productsToReturn = _mapper.Map<IEnumerable<ProductToReturnDto>>(productsFromRepo);
            return Ok(productsToReturn);
        }

        //Edit Company Products
        [HttpPut("edit-product")]
        public async Task<IActionResult> EditProduct(ProductToEdit productToEdit)
        {   
            if(await _repo.ProductExist(productToEdit.ProductName, productToEdit.Id, productToEdit.CompanyId))
                return BadRequest("Name Already Exist");
            var productFromRepo = await _repo.GetProduct(productToEdit.Id);
            _mapper.Map(productToEdit , productFromRepo);
            if(await _repo.SaveAll())
            {
                var productToReturnFromRepo = await _repo.GetProduct(productToEdit.Id);
                var prodToReturn = _mapper.Map<ProductToReturnDto>(productToReturnFromRepo);
                return Ok(prodToReturn);
            }
            throw new Exception($"Updating product {productToEdit.Id} failed to save");
        }

        //Delete Company Products
        [HttpDelete("delete-product/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productFromRepo = await _repo.GetProduct(id);
            if(productFromRepo != null)
                _repo.Delete(productFromRepo);
            if(await _repo.SaveAll())
                return Ok();
            return BadRequest("Problem Deleting Data!");
        }

        //Employees
        //Register Employees
        [HttpPost("register-employee")]
        public async Task<IActionResult> RegisterEmployee(EmployeeForRegisterDto employeeForRegisterDto)
        {   
            if(employeeForRegisterDto.EmployeeType == "Cashier")
            {
                employeeForRegisterDto.Username = employeeForRegisterDto.Username.ToLower();
                if(await _repo.EmployeeUsernameExist(employeeForRegisterDto.Username , employeeForRegisterDto.CompanyId))
                    return BadRequest("Username Already Exist");
            }
            var employeeToCreate = _mapper.Map<Employee>(employeeForRegisterDto);
            var createdEmployee = await _repo.RegisterEmployee(employeeToCreate, employeeForRegisterDto.Password);
            var employeeToReturn = _mapper.Map<EmployeesToReturnDto>(createdEmployee);
            return Ok(employeeToReturn);
        }

        //Get Employees By Company
        [HttpGet("employees/{id}")]
        public async Task<IActionResult> GetEmployees(int id)
        {
            var employees = await _repo.GetEmployees(id);
            var EmployeesToReturn = _mapper.Map<IEnumerable<EmployeesToReturnDto>>(employees);
            return Ok(EmployeesToReturn);
        }

        //Delete Employee
        [HttpDelete("delete-employee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employeeFromRepo = await _repo.GetEmployee(id);
            if(employeeFromRepo != null)
            {
                _repo.Delete(employeeFromRepo);
            }
            if(await _repo.SaveAll())
                return Ok();
            return BadRequest("Problem Deleting Data!");
        }

    }
}