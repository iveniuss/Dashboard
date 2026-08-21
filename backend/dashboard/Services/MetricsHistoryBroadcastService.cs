using dashboard.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace dashboard.Services;

public class MetricsHistoryBroadcastService(
    SystemMetricsCache cache,
    MetricsHubTracker tracker,
    IHubContext<MetricsHub> hubContext) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(60));

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            var snapshots = cache.Snapshots;
            if (tracker.IsSubscribed)
                await hubContext.Clients.All.SendAsync("UpdateHistory", snapshots, cancellationToken: stoppingToken);
        }
    }
}