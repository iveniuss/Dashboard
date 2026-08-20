using dashboard.DTOs;
using dashboard.Models;

namespace dashboard.Services;

public class SystemMetricsProvider : ISystemMetricsProvider
{
    
    private CpuStatSnapshot? _lastSnapshot;

    /// <summary>
    /// Get  raw CPU usage data from /proc/stat file
    /// </summary>
    /// <returns>
    /// <see cref="CpuStatSnapshot"/> object with parsed data
    /// </returns>
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
    /// <returns>
    /// <see cref="CpuInfo"/> object with parsed data
    /// </returns>
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
        
        var usagePercent = totalDelta == 0 ? 0 : Convert.ToInt32((1.0 - (double)idleDelta / totalDelta) * 100);

        _lastSnapshot = current;

        return new CpuInfo { Usage = usagePercent };
    }

    /// <summary>
    /// Parses raw memory usage data from /proc/meminfo file
    /// </summary>
    /// <returns>
    /// <see cref="MemStatSnapshot"/> object with parsed data
    /// </returns>
    private async Task<MemStatSnapshot> GetMemStatSnapshotAsync()
    {
        var lines = await File.ReadAllLinesAsync("/proc/meminfo");
        var snapshot = new MemStatSnapshot();

        foreach (var line in lines)
        {
            var parts = line.Split(':', 2);
            if (parts.Length != 2) continue;
            var key = parts[0].Trim();
            var value = parts[1].Trim().Split(' ')[0];

            if (!long.TryParse(value, out var number))
                continue;
            
            number *= 1024;
                
            switch (key)
            {
                case "MemTotal":
                    snapshot.Total = number;
                    break;
                case "MemFree":
                    snapshot.Free = number;
                    break;
                case "MemAvailable":
                    snapshot.Available = number;
                    break;
                case "Buffers":
                    snapshot.Buffers = number;
                    break;
                case "Cached":
                    snapshot.Cached = number;
                    break;
                case "SwapTotal":
                    snapshot.SwapTotal = number;
                    break;
                case "SwapFree":
                    snapshot.SwapFree = number;
                    break;
            }
        }
        
        return snapshot;
    }

    /// <summary>
    /// Get memory usage
    /// </summary>
    /// <returns>
    /// <see cref="MemInfo"/> object with parsed data
    /// </returns>
    public async Task<MemInfo> GetMemUsageAsync()
    {
        var snapshot = await GetMemStatSnapshotAsync();
        
        return MemInfo.FromSnapshot(snapshot);
    }

    public List<DiskInfo> GetDiskUsage()
    {
        DriveInfo[] allDrives = DriveInfo.GetDrives();
        var result = new List<DiskInfo>();

        foreach (var drive in allDrives)
        {
            if (drive.IsReady && drive.DriveType == DriveType.Fixed)
                result.Add(new DiskInfo(drive.Name, drive.TotalSize, drive.TotalFreeSpace));
                
        }

        return result;
    }
}