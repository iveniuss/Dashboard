namespace dashboard.Models;

public class CpuStatSnapshot
{
    public long User, Nice, System, Idle, IoWait, Irq, SoftIrq, Steal;

    public long Total => User + Nice + System + Idle + IoWait + Irq + SoftIrq + Steal;
    public long IdleTotal => Idle + IoWait;
}