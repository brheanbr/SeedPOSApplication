using AutoMapper;
using Seed.API.Dtos;
using Seed.API.Models;

namespace Seed.API.Helpers
{
    public class AutoMapperProfiles : Profile 
    {
        public AutoMapperProfiles()
        {
            CreateMap<AdminForRegisterDto, Admin>();
            CreateMap<CompanyForRegisterDto, Company>();
            CreateMap<Company, CompanyToReturnDto>();
            CreateMap<Subscription, SubsToReturnDto>();
            CreateMap<SubsToCreate, Subscription>();
            CreateMap<Product, ProductToReturnDto>();
            CreateMap<ProductToCreateDto, Product>();
            CreateMap<ProductToEdit, Product>();
            CreateMap<EmployeeForRegisterDto, Employee>();
            CreateMap<Employee, EmployeesToReturnDto>();
            CreateMap<Order, OrderToReturnDto>();
            CreateMap<OrderToCreateDto, Order>();
            CreateMap<OrderToEditDto, Order>();
        }
    }
}