using DBProject.Controllers;
using DBProject.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBProject.Services
{
    public interface IUserService
    {
        bool IsValid(LoginModel req, out object user);
    }
    public class UserService : IUserService
    {
        private readonly EditorContext _editorContext;
        private readonly JournalistContext _journalistContext;

        public UserService(EditorContext editorContext, JournalistContext journalistContext)
        {
            _editorContext = editorContext;
            _journalistContext = journalistContext;
        }
        public bool IsValid(LoginModel req, out object user)
        {
            if (req.IsEditor)
            {
                var u = (from e in _editorContext.Editor where e.CertId == req.CertId && e.Password == req.Password &&e.Permission>=0 select e).FirstOrDefault();
                user = u;
                if (u == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                var u = (from j in _journalistContext.Journalists where j.CertId == req.CertId && j.Password==req.Password && !j.Banished select j).FirstOrDefault();
                user = u;
                if (u == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
    }
}
