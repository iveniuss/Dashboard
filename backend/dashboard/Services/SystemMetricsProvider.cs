using dashboard.Models;

namespace dashboard.Services;

public class SystemMetricsProvider : ISystemMetricsProvider
{
    
    private CpuStatSnapshot? _lastSnapshot;

    /// <summary>
    /// Get  raw CPU usage data from /proc/stat file
    /// </summary>
    /// <returns></returns>
    async Task<CpuStatSnapshot> GetCpuStatSnapshotAsync()
    {
        var lines = await File.ReadAllLinesAsync("/proc/stat");
        var cpuLine = lines.First(l => l.StartsWith("cpu "));
        
        var parts = cpuLine.Split(' ', StringSplitOptions.RemoveEmptyEntries)
            .Skip(1)
            .Select(long.Parse)
            .ToArray();
        
        return new CpuStatSnapshot
        {
            User = parts[0],
            Nice = parts[1],
            System = parts[2],
            Idle = parts[3],
            IoWait = parts.Length > 4 ? parts[4] : 0,
            Irq = parts.Length > 5 ? parts[5] : 0,
            SoftIrq = parts.Length > 6 ? parts[6] : 0,
            Steal = parts.Length > 7 ? parts[7] : 0,
        };
    }

    /// <summary>
    /// Get CPU usage in percents
    /// </summary>
    /// <returns></returns>
    public async Task<CpuInfo> GetCpuUsageAsync()
    {
        var current = await GetCpuStatSnapshotAsync();

        if (_lastSnapshot == null)
        {
            _lastSnapshot = current;
            await Task.Delay(200);
            current = await GetCpuStatSnapshotAsync();
        }
        
        var totalDelta = current.Total - _lastSnapshot.Total;
        var idleDelta = current.IdleTotal - _lastSnapshot.IdleTotal;
        
        var usagePercent = totalDelta == 0 ? 0 : (1.0 - (double)idleDelta / totalDelta) * 100;

        _lastSnapshot = current;

        return new CpuInfo { Usage = usagePercent };
    }
}