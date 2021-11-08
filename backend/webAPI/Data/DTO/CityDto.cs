using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Data.DTO
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50, MinimumLength =2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage ="Only numeric characters are not accepted" )]
        public string Name { get; set; }

        [Required]
        public string Country { get; set; }
    }
}
