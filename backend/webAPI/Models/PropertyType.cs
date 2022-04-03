using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    public class PropertyType:BaseEntity
    {
       
        [Required]
        public string Name { get; set; }
    }
}