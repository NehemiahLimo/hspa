using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    public class FurnishingType : BaseEntity
    {
       
        [Required]
        public string Name { get; set; }
    }
}