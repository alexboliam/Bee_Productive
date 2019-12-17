using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class CoachInfo
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string CoachName { get; set; }
        public int Age { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string Surname { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string Patronimic { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string Country { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string  City { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string Gender { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(255, ErrorMessage = "Invalid field length")]
        public string Qualification { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string Workplace { get; set; }
        public double Price { get; set; }
        
        [Required]
        public Guid CoachId { get; set; }
        public virtual Coach Coach { get; set; }
    }
}
