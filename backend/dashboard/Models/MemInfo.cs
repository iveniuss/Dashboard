namespace dashboard.Models;

public class MemInfo
{
    public long Total, Used, UsedWithCache, SwapTotal, SwapUsed;
    
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