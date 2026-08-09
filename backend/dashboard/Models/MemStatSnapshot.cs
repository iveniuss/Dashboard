namespace dashboard.Models;

public class MemStatSnapshot
{
    public long Total, Free, Available, Buffers, Cached, SwapTotal, SwapFree;
    
    public long UsedWithCache => Total - Free;
    public long UsedWithoutCache => Total - Available;
    public long UsedSwap => SwapTotal - SwapFree;
}