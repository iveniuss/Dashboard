using dashboard.Services;

namespace dashboard;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        
        builder.Services.AddOpenApi();
        builder.Services.AddSingleton<ISystemMetricsProvider, SystemMetricsProvider>();
        builder.Services.AddSingleton<SystemMetricsCache>();
        builder.Services.AddHostedService<TestService>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v1/swagger.json", "dashboard v1"));
        }

        app.UseHttpsRedirection();

        app.Run();
    }
}