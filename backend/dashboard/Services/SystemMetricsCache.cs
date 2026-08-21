using dashboard.DTOs;

namespace dashboard.Services;
/// <summary>
/// Stores metrics data
/// </summary>
public class SystemMetricsCache
{
    private volatile MetricsSnapshot? _lastSnapshot;
    
    public MetricsSnapshot? LastSnapshot {get => _lastSnapshot; set => _lastSnapshot = value;}
}