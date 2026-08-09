using dashboard.Models;

namespace dashboard.Services;

public interface ISystemMetricsProvider
{
    Task<CpuInfo> GetCpuUsageAsync();
}