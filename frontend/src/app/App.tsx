import { SignalRProvider } from "../shared/SignalRContext.tsx"
import MetricsPage from "../pages/metrics.tsx"
import { Header } from "@/widgets/Header/Header.tsx";

function App() {

  return (
    <>
      <Header />
      <SignalRProvider>
        <MetricsPage />
      </SignalRProvider>
    </>
  );
}

export default App
