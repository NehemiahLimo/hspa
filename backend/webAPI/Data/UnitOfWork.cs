﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webAPI.Data.Interfaces;
using webAPI.Data.Repo;

namespace webAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext db;

        public UnitOfWork(ApplicationDbContext db)
        {
            this.db = db;
        }
        public ICityRepository CityRepository => new CityRepository(db);

        public IUserRepository UserRepository => new UserRepository(db);

        public IPropertyRepository PropertyRepository => new PropertyRepository(db);

        public IFurnishingTypeRepository FurnishingTypeRepository =>
            new FurnishingTypeRepository(db);

        public IPropertyTypeRepository PropertyTypeRepository =>
            new PropertyTypeRepository(db);

        public async Task<bool> SaveAsync()
        {
            return await db.SaveChangesAsync() > 0;
        }
    }
}
