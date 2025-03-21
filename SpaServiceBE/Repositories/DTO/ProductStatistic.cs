using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.DTO
{
    public class ProductStatistic
    {
        public int OrderCount { get; set; }
        public float Revenue { get; set; }
        public int CurrentInStock { get; set; }
        public int[] GenderDistribution { get; set; } = new int[2];
    }
}
