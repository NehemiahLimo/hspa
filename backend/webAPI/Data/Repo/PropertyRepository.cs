using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webAPI.Data.Interfaces;
using webAPI.Models;

namespace webAPI.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly ApplicationDbContext db;

        public PropertyRepository(ApplicationDbContext db)
        {
            this.db = db;
        }
        public void AddProperty(Property property)
        {
            throw new NotImplementedException();
        }

        public void DeleteProperty(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent)
        {
            var properties = await db.Properties
                .Include(x=>x.PropertyType)
                .Include(x=>x.FurnishingType)
                .Include(x=>x.City)
                .Include(x=>x.User)
                .Where(x => x.SellRent == sellRent).ToListAsync();
            return properties;
        }

        public async Task<Property> GetPropertyDetailAsync(int id)
        {
            var properties = await db.Properties
                 .Include(x => x.PropertyType)
                .Include(x => x.FurnishingType)
                .Include(x => x.City)                
                .Where(x => x.Id == id).FirstAsync();
                
            return properties;
        }
    }
}
