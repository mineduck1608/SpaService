using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Repositories;
using Services;
using Services.IServices;
using Services.Services;
using System.Text.Unicode;

var builder = WebApplication.CreateBuilder(args);

// Add SpaServiceContext to DI
builder.Services.AddDbContext<SpaServiceContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add AccountRepository to DI
builder.Services.AddScoped<AccountRepository>();
builder.Services.AddScoped<RoleRepository>();


// Add AccountService to DI
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IRoleService, RoleService>();

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.Create(UnicodeRanges.All);
    });

// Configure Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
