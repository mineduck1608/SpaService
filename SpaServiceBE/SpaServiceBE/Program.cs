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
builder.Services.AddScoped<ScheduleRepository>();
builder.Services.AddScoped<SpaServiceRepository>();
builder.Services.AddScoped<TransactionRepository>();

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
builder.Services.AddScoped<IScheduleService, ScheduleService>();
builder.Services.AddScoped<ISpaServiceService, SpaServiceService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();

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
builder.Services.AddSwaggerGen();




// Enable CORS
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));



var app = builder.Build();


//Url direct to google 
app.MapGet("/login-google", (HttpContext context) =>
{
    var clientId = builder.Configuration["Google:ClientId"];
    var redirectUri = "http://localhost:3000/api/oauth/google";
    var scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

    var authUrl = $"https://accounts.google.com/o/oauth2/v2/auth" +
                  $"?client_id={clientId}" +
                  $"&redirect_uri={redirectUri}" +
                  $"&response_type=code" +
                  $"&scope={scope}" +
                  $"&access_type=online"; // "online" không yêu cầu refresh token

    return Results.Redirect(authUrl);
});





// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Call back from google
app.MapGet("/callback-google", async (HttpContext context) =>
{
    var code = context.Request.Query["code"];
    if (string.IsNullOrEmpty(code))
    {
        return Results.BadRequest("Authorization code not provided");
    }

    var clientId = builder.Configuration["Google:ClientId"]; ;
    var clientSecret = "YOUR_CLIENT_SECRET";
    var redirectUri = builder.Configuration["Google:ClientSecret"];

    var httpClient = new HttpClient();
    var tokenRequest = new HttpRequestMessage(HttpMethod.Post, "https://oauth2.googleapis.com/token")
    {
        Content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("code", code),
            new KeyValuePair<string, string>("client_id", clientId),
            new KeyValuePair<string, string>("client_secret", clientSecret),
            new KeyValuePair<string, string>("redirect_uri", redirectUri),
            new KeyValuePair<string, string>("grant_type", "authorization_code")
        })
    };

    var tokenResponse = await httpClient.SendAsync(tokenRequest);
    var responseContent = await tokenResponse.Content.ReadAsStringAsync();

    if (!tokenResponse.IsSuccessStatusCode)
    {
        return Results.BadRequest($"Error fetching access token: {responseContent}");
    }

    var tokenData = System.Text.Json.JsonSerializer.Deserialize<TokenResponse>(responseContent);
    return Results.Ok(new { AccessToken = tokenData.AccessToken, ExpiresIn = tokenData.ExpiresIn });
});





// Use token to call Api
app.MapGet("/get-google-user", async (HttpContext context) =>
{
    var accessToken = context.Request.Query["access_token"];
    if (string.IsNullOrEmpty(accessToken))
    {
        return Results.BadRequest("Access token is missing");
    }

    var httpClient = new HttpClient();
    httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

    var userInfoResponse = await httpClient.GetAsync("https://www.googleapis.com/oauth2/v3/userinfo");
    var userInfoContent = await userInfoResponse.Content.ReadAsStringAsync();

    if (!userInfoResponse.IsSuccessStatusCode)
    {
        return Results.BadRequest($"Error fetching user info: {userInfoContent}");
    }

    return Results.Ok(userInfoContent);
});


app.UseHttpsRedirection();
app.UseAuthentication(); 
app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
