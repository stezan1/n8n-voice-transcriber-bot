using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using test_api.Data;
using test_api.Model;

namespace test_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly AppDBContext _appDBContext;
        public PatientController(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
        }

        [HttpPost]
        public IActionResult PostPatientInfo(PatientInfo patient)
        {
            if (patient == null) { return BadRequest(); }
            _appDBContext.Add(patient);
            _appDBContext.SaveChanges();
            return Ok(patient);
        }

        [HttpGet]
        public IActionResult GetPatients()
        {
            var patients = _appDBContext.Set<PatientInfo>().ToList();
            return Ok(patients);
        }
    }
}
