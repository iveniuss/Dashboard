import { SignalRProvider } from "@/shared/SignalRContext"
import {MetricsPage} from "@/pages/MetricsPage"
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
