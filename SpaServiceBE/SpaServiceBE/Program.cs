using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Context;
using Repositories.Repositories;
using Services;
using Services.IServices;
using Services.Services;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using System.Text.Unicode;
using Repositories.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add SpaServiceContext to DI
builder.Services.AddDbContext<SpaServiceContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add repositories to DI
builder.Services.AddScoped<AccountRepository>();
builder.Services.AddScoped<RoleRepository>();
builder.Services.AddScoped<AppointmentRepository>();
builder.Services.AddScoped<CategoryRepository>();
builder.Services.AddScoped<CommissionRepository>();
builder.Services.AddScoped<CustomerRepository>();
builder.Services.AddScoped<EmployeeCommissionRepository>();
builder.Services.AddScoped<EmployeeRepository>();
builder.Services.AddScoped<FeedbackRepository>();
builder.Services.AddScoped<MembershipRepository>();
builder.Services.AddScoped<PromotionRepository>();
builder.Services.AddScoped<RequestRepository>();
builder.Services.AddScoped<SpaServiceRepository>();
builder.Services.AddScoped<TransactionRepository>();
builder.Services.AddScoped<ContactRepository>();
builder.Services.AddScoped<NewsRepository>();



// Add services to DI
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IEmployeeCommissionService, EmployeeCommissionService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IComissionService,ComissionService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<IMembershipService, MembershipService>();
builder.Services.AddScoped<IPromotionService, PromotionService>();
builder.Services.AddScoped<IRequestService, RequestService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<ISpaServiceService, SpaServiceService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<INewsService, NewsService>();



// Add secret
builder.Configuration.AddUserSecrets<Program>();

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.Create(UnicodeRanges.All);
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.Never;
    });

// Configure Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Enter JWT Bearer token (e.g., 'Bearer {your token}')"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
    });
//list for audience
//var validAudiences = new List<string>
//{
//    "http://localhost:5266/" // Your server's audience
//    /*"397904889849-udf1t7mvf7vmr1bvvdbmv2amj0nea404.apps.googleusercontent.com"*/,
//     // Google Audience
//};
//var validIssuers = new List<string>
//{
//    "http://localhost:5266/"  // Your own issuer
//    /*"https://accounts.google.com"*/  // Google issuer
//};
// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["AccessToken:Issuer"],  // JWT Issuer from configuration
            ValidAudience = builder.Configuration["AccessToken:Audience"], // JWT Audience from configuration
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AccessToken:Key"])) // JWT signing key
        };
    });







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
app.UseAuthentication(); 
app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
