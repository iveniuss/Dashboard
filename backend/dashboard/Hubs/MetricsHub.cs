using Microsoft.AspNetCore.SignalR;

namespace dashboard.Hubs;

public class MetricsHub(MetricsHubTracker tracker) : Hub
{
    public override Task OnConnectedAsync()
    {
        tracker.OnSubscribe();
        return base.OnConnectedAsync();
    }
    
    public override Task OnDisconnectedAsync(Exception? exception)
    {
        tracker.OnUnsubscribe();
        return base.OnDisconnectedAsync(exception);
    }
}