using System;

namespace Seed.API.Models
{
    public class Subscription
    {
        public int SubscriptionId { get; set; }
        public string ConnectionString { get; set; }
        public DateTime SubscriptionStart { get; set; }
        public DateTime SubscriptionEnd { get; set; }
        public int CompanyId { get; set; }
    }
}