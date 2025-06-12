using System.Collections.Generic;
using Server.Models;

namespace Server.Services
{
    public class ProfileService
    {
        private Profile _profile = new Profile();

        public Profile Get() => _profile;

        public void Update(Profile profile)
        {
            _profile = profile;
        }
    }
}
