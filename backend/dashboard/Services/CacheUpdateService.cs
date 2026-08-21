using dashboard.DTOs;

namespace dashboard.Services;
/// <summary>
/// Background service that updates cache class
/// </summary>
/// <param name="logger"></param>
/// <param name="metricsProvider"></param>
/// <param name="cache"></param>
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
                var diskInfo = metricsProvider.GetDiskUsage();

                cache.LastSnapshot = new MetricsSnapshot
                (
                    DateTime.UtcNow,
                    cpuInfo,
                    memInfo,
                    diskInfo
                );
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error getting CPU usage");
            }
        }
    }
}