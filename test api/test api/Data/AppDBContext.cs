using Microsoft.EntityFrameworkCore;
using test_api.Model;

namespace test_api.Data
{
    public class AppDBContext:DbContext
    {
        DbSet<PatientInfo>  patientInfos { get; set; }
        public AppDBContext(DbContextOptions<AppDBContext> dbContextOptions) :base(dbContextOptions){ }
    }
}
