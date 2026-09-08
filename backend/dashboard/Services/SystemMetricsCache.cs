using dashboard.DTOs;

namespace dashboard.Services;

/// <summary>
/// Stores metrics data
/// </summary>
public class SystemMetricsCache
{
    private volatile MetricsSnapshot? _lastSnapshot;
    private readonly List<MetricsSnapshot> _snapshots = new();
    private readonly int _recordsToKeep = 20;

    public MetricsSnapshot? LastSnapshot
    {
        get => _lastSnapshot;
        set => _lastSnapshot = value;
    }

    public IReadOnlyList<MetricsSnapshot> Snapshots => _snapshots;

    public void UpdateLongTimeCache(MetricsSnapshot snapshot)
    {
        _snapshots.Add(snapshot);
        if (_snapshots.Count > _recordsToKeep)
            _snapshots.RemoveAt(0);
    }
}