using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/items")]
    public class ItemsController : ControllerBase
    {
        private static List<Item> items = new List<Item>();

        // GET all items
        [HttpGet]
        public IActionResult GetItems()
        {
            return Ok(items);
        }

        // ADD item
        [HttpPost]
        public IActionResult AddItem(Item item)
        {
            var name = item.Name?.Trim();
            var sku = item.SKU?.Trim();

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(sku))
                return BadRequest("Name and SKU required");

            if (item.Quantity < 0)
                return BadRequest("Quantity must be >= 0");

            if (items.Any(i => i.SKU.Equals(sku, StringComparison.OrdinalIgnoreCase)))
                return BadRequest("SKU must be unique");

            item.Name = name;
            item.SKU = sku;

            items.Add(item);
            return Ok(item);
        }

        // DELETE item
        [HttpDelete("{sku}")]
        public IActionResult DeleteItem(string sku)
        {
            var cleanSku = sku?.Trim();

            var item = items.FirstOrDefault(i =>
                i.SKU.Equals(cleanSku, StringComparison.OrdinalIgnoreCase));

            if (item == null)
                return NotFound("Item not found");

            items.Remove(item);
            return Ok("Item deleted");
        }

        // UPDATE item
        [HttpPut("{sku}")]
        public IActionResult UpdateItem(string sku, Item updated)
        {
            var originalSku = sku?.Trim();
            var newSku = updated.SKU?.Trim();
            var newName = updated.Name?.Trim();

            var item = items.FirstOrDefault(i =>
                i.SKU.Equals(originalSku, StringComparison.OrdinalIgnoreCase));

            if (item == null)
                return NotFound("Item not found");

            if (string.IsNullOrWhiteSpace(newName) || string.IsNullOrWhiteSpace(newSku))
                return BadRequest("Name and SKU required");

            if (updated.Quantity < 0)
                return BadRequest("Quantity must be >= 0");

            // Prevent duplicate SKU (except itself)
            if (items.Any(i =>
                i.SKU.Equals(newSku, StringComparison.OrdinalIgnoreCase) && i != item))
            {
                return BadRequest("SKU must be unique");
            }

            // Update safely
            item.Name = newName;
            item.SKU = newSku;
            item.Quantity = updated.Quantity;

            return Ok(item);
        }
    }
}