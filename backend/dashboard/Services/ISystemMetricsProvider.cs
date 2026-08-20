using dashboard.DTOs;
using dashboard.Models;

namespace dashboard.Services;

public interface ISystemMetricsProvider
{
    Task<CpuInfo> GetCpuUsageAsync();
    Task<MemInfo> GetMemUsageAsync();
    List<DiskInfo> GetDiskUsage();
}