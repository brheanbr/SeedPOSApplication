namespace Seed.API.Models
{
    public class ConnectionStrings
    {
        public int ConnectionStringId { get; set; }
        public string ConnectionString { get; set; }
        public Subscription Subscription { get; set; }
    }
}