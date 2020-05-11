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
            if(await _repo.ProductExist(productToCreateDto.ProductName, productToCreateDto.CompanyId))
                return BadRequest("Name Already Exist");
            var productToCreate = _mapper.Map<Product>(productToCreateDto);
            var productFromRepo = await _repo.RegisterProduct(productToCreate);
            var productToReturn = _mapper.Map<ProductToReturnDto>(productFromRepo);
            return Ok(productToReturn);
        }

        //Get products by Bompany
        [HttpGet("products/{id}")]
        public async Task<IActionResult> GetProducts(int id)
        {
            var productsFromRepo= await _repo.GetProducts(id);
            if( productsFromRepo == null )
                return BadRequest("Can't Find Any Products");
            return Ok(productsFromRepo);
            
        }

        //Edit Company Products
        [HttpPut("edit-product")]
        public async Task<IActionResult> EditProduct(ProductToEdit productToEdit)
        {
            if(await _repo.ProductExist(productToEdit.ProductName, productToEdit.CompanyId))
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
            return BadRequest("Error Deleting Data");
        }




    }
}