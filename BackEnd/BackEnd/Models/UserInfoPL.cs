﻿using System;

namespace BackEnd.Models
{
    public class UserInfoPL
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Surname { get; set; }
        public string Patronimic { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public DateTime DateBirth { get; set; }
        public string PhoneNumber { get; set; }

        public Guid UserId  { get; set; }
        public virtual UserPL User { get; set; }
    }
}
