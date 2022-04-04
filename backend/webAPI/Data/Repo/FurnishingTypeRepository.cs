using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webAPI.Data.Interfaces;
using webAPI.Models;

namespace webAPI.Data.Repo
{
    public class FurnishingTypeRepository: IFurnishingTypeRepository
    {
        private readonly ApplicationDbContext dc;

        public FurnishingTypeRepository(ApplicationDbContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync()
        {
            return await dc.FurnishingTypes.ToListAsync();
        }
    }
}
