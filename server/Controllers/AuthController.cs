using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.Collections.Generic;
using System.Linq;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private static List<Profile> _users = new List<Profile>();

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] Profile profile)
        {
            if (_users.Any(u => u.Email == profile.Email))
                return Conflict("Email already exists.");

            _users.Add(profile);
            return Ok(profile);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest req)
        {
            var user = _users.FirstOrDefault(u => u.Email == req.Email && u.Password == req.Password);
            if (user == null)
                return Unauthorized();

            return Ok(user);
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
