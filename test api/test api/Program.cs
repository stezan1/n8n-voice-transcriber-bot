using Microsoft.EntityFrameworkCore;
using test_api.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Add services to the container.
builder.Services.AddDbContext<AppDBContext>(options=>
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddCors(options =>
{

    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "test api API", Version = "v1" });
});

var app = builder.Build();

app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "test api API V1");
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapGet("/", () => "Welcome to the test api!");

app.MapControllers();

app.Run();
