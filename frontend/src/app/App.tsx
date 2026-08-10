import { SignalRProvider } from "../shared/SignalRContext.tsx"
import MetricsPage from "../pages/metrics.tsx"

function App() {

  return <SignalRProvider>
    <MetricsPage />
  </SignalRProvider>
}

export default App
