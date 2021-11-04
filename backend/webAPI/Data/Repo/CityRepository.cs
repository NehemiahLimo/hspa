using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webAPI.Data.Interfaces;
using webAPI.Models;

namespace webAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly ApplicationDbContext db;
        public CityRepository(ApplicationDbContext db)
        {
            this.db = db;   
        }
        public void AddCity(City city)
        {
            db.Cities.AddAsync(city);
        }

        public void DeleteCity(int CityId)
        {

            var city =  db.Cities.Find(CityId);
            db.Cities.Remove(city);
            db.SaveChanges();
            
        }

        public async Task<City> FindCity(int id)
        {

            return await db.Cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await db.Cities.ToListAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return await db.SaveChangesAsync() > 0;
        }
    }
}
