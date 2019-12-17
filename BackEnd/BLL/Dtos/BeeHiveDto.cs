using System;

namespace BLL.Dtos
{
    public class BeeHiveDto
    {
        public Guid Id { get; set; }
        public double HiveSize { get; set; }

        public Guid UserId { get; set; }
        public virtual UserDto User { get; set; }
    }
}
