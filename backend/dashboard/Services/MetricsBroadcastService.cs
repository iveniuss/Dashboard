using dashboard.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace dashboard.Services;
/// <summary>
/// Background service that sends metrics to frontend
/// </summary>
/// <param name="hubContext"></param>
/// <param name="cache"></param>
public class MetricsBroadcastService(IHubContext<MetricsHub> hubContext, SystemMetricsCache cache) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(1));
        
        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            var snapshot = cache.LastSnapshot;

            await hubContext.Clients.All.SendAsync("MetricsUpdate", snapshot, stoppingToken);
            
            
        }
    }
}