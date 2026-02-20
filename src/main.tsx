import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dispatch a custom event after React has mounted so the Puppeteer
// prerenderer knows the page is fully rendered and ready to capture.
// In normal browsers this is a harmless no-op.
if (typeof window !== "undefined") {
  const dispatch = () =>
    document.dispatchEvent(new Event("prerender-ready"));
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(dispatch, { timeout: 4000 });
  } else {
    setTimeout(dispatch, 500);
  }
}
