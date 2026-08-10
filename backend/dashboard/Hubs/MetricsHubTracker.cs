namespace dashboard.Hubs;

public class MetricsHubTracker
{
    private int _counter = 0;
    public bool IsSubscribed => _counter > 0;

    /// <summary>
    /// increase connections counter
    /// </summary>
    public void OnSubscribe()
    {
        Interlocked.Increment(ref _counter);
    }

    /// <summary>
    /// decrease connections counter
    /// </summary>
    public void OnUnsubscribe()
    {
        Interlocked.Decrement(ref _counter);
    }
    
}