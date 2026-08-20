using dashboard.DTOs;

namespace dashboard.Models;

public record MetricsSnapshot
{
    public DateTime Timestamp { get; init; }
    public CpuInfo? Cpu { get; init; }
    public MemInfo? Mem { get; init; }
    public List<DiskInfo>? Disks { get; init; }
}