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
                var usage = await metricsProvider.GetCpuUsageAsync();
                Console.WriteLine(usage.Usage);
                await Task.Delay(500, stoppingToken);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error getting CPU usage");
            }
        }
    }
}