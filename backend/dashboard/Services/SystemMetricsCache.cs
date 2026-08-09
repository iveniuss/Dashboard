using dashboard.Models;

namespace dashboard.Services;

public class SystemMetricsCache
{
    private volatile MetricsSnapshot? _lastSnapshot;
    
    public MetricsSnapshot? LastSnapshot {get => _lastSnapshot; set => _lastSnapshot = value;}
}