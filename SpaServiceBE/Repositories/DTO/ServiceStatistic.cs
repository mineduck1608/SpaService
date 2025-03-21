using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.DTO
{
    public class ServiceStatistic
    {
        public int RequestCount { get; set; }
        public int AppointmentCount { get; set; }
        public int[] Rating { get; set; } = new int[5];
        public int[] GenderCount { get; set; } = new int[2];
        public float Revenue {  get; set; }
    }
}
