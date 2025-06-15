using System.Collections.Generic;

namespace Server.Models
{
    public class Profile
    {
        public int Id { get; set; } // optional

        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } 
        public string LinkedIn { get; set; }
        public string GitHub { get; set; }
        public string Headline { get; set; }
        public string Location { get; set; }
        public string Website { get; set; }
        public string Phone { get; set; }

        public List<string> Skills { get; set; }
        public List<Experience> Experiences { get; set; }
        public List<Education> Educations { get; set; }
    }

    public class Experience
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public string EmploymentType { get; set; }
        public string LocationType { get; set; }
        public string Location { get; set; }
        public string StartMonth { get; set; }
        public string StartYear { get; set; }
        public string EndMonth { get; set; }
        public string EndYear { get; set; }
        public bool Current { get; set; }
        public string Description { get; set; }
    }

    public class Education
    {
        public string School { get; set; }
        public string Degree { get; set; }
        public string FieldOfStudy { get; set; }
        public string StartMonth { get; set; }
        public string StartYear { get; set; }
        public string EndMonth { get; set; }
        public string EndYear { get; set; }
        public bool CurrentlyStudying { get; set; }
        public string Grade { get; set; }
        public string Description { get; set; }
    }
}
