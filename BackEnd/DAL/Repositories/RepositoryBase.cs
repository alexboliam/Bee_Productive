using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DAL.Repositories
{
    abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected internal BeeContext BeeContext { get; }

        public RepositoryBase(BeeContext context)
        {
            this.BeeContext = context;
        }

        public void Create(T entity)
        {
            this.BeeContext.Set<T>().Add(entity);
        }
        public void Delete(T entity)
        {
            this.BeeContext.Set<T>().Remove(entity);
        }
        public IEnumerable<T> FindAll()
        {
            return this.BeeContext.Set<T>();
        }

        public IEnumerable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.BeeContext.Set<T>().Where(expression);
        }
        public void Update(T entity)
        {
            this.BeeContext.Set<T>().Update(entity);
        }
    }
}
