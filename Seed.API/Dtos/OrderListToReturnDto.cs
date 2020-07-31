using Seed.API.Models;

namespace Seed.API.Dtos
{
    public class OrderListToReturnDto
    {
        public int OrderListId { get; set; }
        public int Qty { get; set; }
        public string Item { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public int OrderId { get; set; }
    }
}