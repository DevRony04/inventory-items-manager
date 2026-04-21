namespace backend.Models
{
    public class Item
    {
        public required string Name { get; set; }
        public required string SKU { get; set; }
        public int Quantity { get; set; }

        public string StockStatus =>
            Quantity == 0 ? "Out of Stock" :
            Quantity < 10 ? "Low Stock" :
            "In Stock";
    }
}