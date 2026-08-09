using dashboard.Models;

namespace dashboard.Services;

public class CacheUpdateService(
    ILogger<CacheUpdateService> logger,
    ISystemMetricsProvider metricsProvider,
    SystemMetricsCache cache
) : BackgroundService
{
    private readonly TimeSpan _refreshInterval = TimeSpan.FromSeconds(1);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("TestService started");
        
        using var timer = new PeriodicTimer(_refreshInterval);

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                var memInfo = await metricsProvider.GetMemUsageAsync();
                var cpuInfo = await metricsProvider.GetCpuUsageAsync();

                cache.LastSnapshot = new MetricsSnapshot
                {
                    Timestamp = DateTime.UtcNow,
                    Cpu = cpuInfo,
                    Mem = memInfo
                };
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error getting CPU usage");
            }
        }
    }
}