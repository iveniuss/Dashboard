namespace dashboard.DTOs;

public record MetricsSnapshot(DateTime Timestamp, CpuInfo Cpu, MemInfo Mem, List<DiskInfo> Disks);