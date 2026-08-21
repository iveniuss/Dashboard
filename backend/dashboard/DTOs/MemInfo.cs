using dashboard.Models;

namespace dashboard.DTOs;

public record MemInfo(long Total, long Used, long UsedWithCache, long SwapTotal, long SwapUsed)
{
    public static MemInfo FromSnapshot(MemStatSnapshot snapshot)
    {
        return new MemInfo(
            snapshot.Total,
            snapshot.UsedWithoutCache,
            snapshot.UsedWithCache,
            snapshot.SwapTotal,
            snapshot.UsedSwap);
    }
}