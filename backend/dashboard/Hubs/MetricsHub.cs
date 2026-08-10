using Microsoft.AspNetCore.SignalR;

namespace dashboard.Hubs;

public class MetricsHub(MetricsHubTracker tracker) : Hub
{
    public void Subscribe()
    {
        tracker.OnSubscribe();
    }
}