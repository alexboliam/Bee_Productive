using System;

namespace BLL.Dtos
{
    public class CoachInfoDto
    {
        public Guid Id { get; set; }
        public string CoachName { get; set; }
        public int Age { get; set; }
        public string Surname { get; set; }
        public string Patronimic { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Qualification { get; set; }
        public string Workplace { get; set; }
        public double Price { get; set; }
        
        public Guid CoachId { get; set; }
        public virtual CoachDto Coach { get; set; }
    }
}
