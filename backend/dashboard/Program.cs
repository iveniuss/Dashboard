using dashboard.Hubs;
using dashboard.Services;

namespace dashboard;

public class Program
{
    
    private const string LocalhostCorsPolicy = "AllowLocalhost";
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        
        builder.Services.AddOpenApi();
        builder.Services.AddSignalR();
        builder.Services.AddSingleton<ISystemMetricsProvider, SystemMetricsProvider>();
        builder.Services.AddSingleton<SystemMetricsCache>();
        builder.Services.AddHostedService<CacheUpdateService>();
        builder.Services.AddHostedService<MetricsBroadcastService>();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(LocalhostCorsPolicy, policy =>
            {
                policy.SetIsOriginAllowed(origin =>
                    {
                        if (string.IsNullOrWhiteSpace(origin)) return false;
                        if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri)) return false;
                        return uri.Host is "localhost" or "127.0.0.1" or "[::1]";
                    })
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });
        
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v1/swagger.json", "dashboard v1"));
        }

        app.MapHub<MetricsHub>("/hubs/metrics");

        app.UseHttpsRedirection();
        app.UseCors(LocalhostCorsPolicy);

        app.Run();
    }
}