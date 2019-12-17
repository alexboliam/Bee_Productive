using System;

namespace BackEnd.Models 
{ 
    public class BeeHivePL
    {
        public Guid Id { get; set; }
        public double HiveSize { get; set; }

        public Guid UserId { get; set; }
        public virtual UserPL User { get; set; }
    }
}
