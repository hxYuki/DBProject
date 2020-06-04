using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DBProject.Data;
using DBProject.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using DBProject.Services;

namespace DBProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthenticateService _authService;

        public LoginController(IAuthenticateService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public ActionResult Login(LoginModel login)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Request");
            }

            string token;
            if (_authService.IsAuthenticated(login, out token, out object user))
            {
                if (login.IsEditor)
                {
                    return Ok(new LoginReturningModel { User = (Editor) user, Token = token });
                    
                }
                else
                    return Ok(new LoginReturningModel { User = (Journalist) user, Token = token });
            }

            return BadRequest("Invalid Request");
        }
    }

    public class LoginModel
    {
        [Required]
        [JsonProperty("id")]
        public long CertId { get; set; }
        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }
        [Required]
        [JsonProperty("isEditor")]
        public bool IsEditor { get; set; }
    }
    public class LoginReturningModel
    {
        public object User { get; set; }
        public string Token { get; set; }
    }
}
