namespace dashboard.Services;

public class TestService(ILogger<TestService> logger, ISystemMetricsProvider metricsProvider): BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("TestService started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var memInfo = await metricsProvider.GetMemUsageAsync();
                Console.Clear();
                Console.WriteLine($"Used {memInfo.Used}");
                Console.WriteLine($"Used with cache {memInfo.UsedWithCache}");
                Console.WriteLine($"Usage {memInfo.Usage}");
                Console.WriteLine($"Swap usage {memInfo.SwapUsage}");
                await Task.Delay(500, stoppingToken);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error getting CPU usage");
            }
        }
    }
}