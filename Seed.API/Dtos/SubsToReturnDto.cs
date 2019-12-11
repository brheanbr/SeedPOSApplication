using System;

namespace Seed.API.Dtos
{
    public class SubsToReturnDto
    {
        public int Id { get; set; }
        public string ConnectionString { get; set; }
        public DateTime SubscriptionStart { get; set; }
        public DateTime SubscriptionEnd { get; set; }
        public int CompanyId { get; set; }
        
    }
}