using System.Collections.Generic;

namespace Seed.API.Models
{
    public class OrderList
    {
        public int OrderListId { get; set; }
        public int Qty { get; set; }
        public string Item { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
    }
}