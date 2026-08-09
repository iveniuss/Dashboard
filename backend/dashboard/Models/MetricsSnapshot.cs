namespace dashboard.Models;

public record MetricsSnapshot
{
    public DateTime Timestamp { get; init; }
    public CpuInfo Cpu { get; init; }
    public MemInfo Mem { get; init; }
}