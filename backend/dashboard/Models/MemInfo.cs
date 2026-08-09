namespace dashboard.Models;

public class MemInfo
{
    public long Total { get; init; }
    public long Used { get; init; }
    public long UsedWithCache { get; init; }
    public long SwapTotal { get; init; }
    public long SwapUsed { get; init; }

    public double Usage => (double)Used / Total;
    public double SwapUsage => (double)SwapUsed / SwapTotal;

    public static MemInfo FromSnapshot(MemStatSnapshot snapshot)
    {
        return new MemInfo
        {
            Total = snapshot.Total,
            Used = snapshot.UsedWithoutCache,
            UsedWithCache = snapshot.UsedWithCache,
            SwapTotal = snapshot.SwapTotal,
            SwapUsed = snapshot.UsedSwap,
        };
    }
}