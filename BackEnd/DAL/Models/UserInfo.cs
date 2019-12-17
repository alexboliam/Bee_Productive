using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class UserInfo
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string Email { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string UserName { get; set; }
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
        public string City { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string Gender { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public DateTime DateBirth { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string PhoneNumber { get; set; }

        [Required]
        public Guid UserId  { get; set; }
        public virtual User User { get; set; }
    }
}
