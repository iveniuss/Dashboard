import { SignalRProvider } from "@/shared/SignalRContext"
import MetricsPage from "@/widgets/MetricsGrid"
import { Header } from "@/widgets/Header";

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
