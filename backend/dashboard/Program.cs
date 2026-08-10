using dashboard.Hubs;
using dashboard.Services;

namespace dashboard;

public class Program
{
    
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        
        builder.Services.AddSignalR();
        builder.Services.AddCors();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddSingleton<ISystemMetricsProvider, SystemMetricsProvider>();
        builder.Services.AddSingleton<SystemMetricsCache>();
        builder.Services.AddHostedService<CacheUpdateService>();
        builder.Services.AddHostedService<MetricsBroadcastService>();
        builder.Services.AddSingleton<MetricsHubTracker>();
        
        
        var app = builder.Build();
        
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v1/swagger.json", "dashboard v1"));
            app.UseCors(policy => policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
        }

        app.MapHub<MetricsHub>("/hubs/metrics");

        app.UseHttpsRedirection();

        app.Run();
    }
}