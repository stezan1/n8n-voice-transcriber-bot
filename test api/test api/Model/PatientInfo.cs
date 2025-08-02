using System.ComponentModel.DataAnnotations;

namespace test_api.Model
{
    public class PatientInfo
    {
        [Key]
        public int Id { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Symptoms { get; set; } = string.Empty;
        public string DurationOfSymptoms { get; set; } = string.Empty;
        public string Diagnosis { get; set; } = string.Empty;
        public string PrescribedMedications { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public string FollowUpAdvice { get; set; } = string.Empty;
        public string ReferredSpecialist { get; set; } = string.Empty;
    }
}
