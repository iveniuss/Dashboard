using dashboard.DTOs;

namespace dashboard.Services;

/// <summary>
/// Stores metrics data
/// </summary>
public class SystemMetricsCache
{
    private volatile MetricsSnapshot? _lastSnapshot;
    private readonly List<MetricsSnapshot> _snapshots = new();

    public MetricsSnapshot? LastSnapshot
    {
        get => _lastSnapshot;
        set => _lastSnapshot = value;
    }

    public IReadOnlyList<MetricsSnapshot> Snapshots => _snapshots;

    public void UpdateLongTimeCache(MetricsSnapshot snapshot)
    {
        _snapshots.Add(snapshot);
    }
}