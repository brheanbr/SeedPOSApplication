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
        }
    }
}