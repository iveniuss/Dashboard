export interface IMetrics {
  timestamp: string;
  cpu: {
    usage: number;
  };
  mem: {
    total: number;
    used: number;
    usedWithCache: number;
    swapTotal: number;
    swapUsed: number;
  };
  disks: [
    {
      name: string;
      total: number;
      free: number;
    },
  ];
}