using Microsoft.AspNetCore.Http.Features;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Adding cors to access front
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder => 
        {
            builder.WithOrigins("http://localhost:5500")
                .WithMethods("GET", "POST")
                .WithHeaders(HeaderNames.ContentType);
        }
    );
});

// Add services to the container.
builder.Services.Configure<FormOptions>(options => // Configure the limit
{
    //options.ValueLengthLimit = 104857600; // 100 MB
    options.MultipartBodyLengthLimit = 104857600; // 100 MB
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
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
