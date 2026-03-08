import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { trackError } from "./lib/errorTracker";

// Global error listeners for production error tracking
window.addEventListener("error", (event) => {
  trackError(event.error ?? event.message, { componentName: "window.onerror" });
});
window.addEventListener("unhandledrejection", (event) => {
  trackError(event.reason, { componentName: "unhandledrejection" });
});

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dispatch a custom event after React has mounted so the Puppeteer
// prerenderer knows the page is fully rendered and ready to capture.
// In normal browsers this is a harmless no-op.
if (typeof window !== "undefined") {
  const dispatch = () => {
    document.dispatchEvent(new Event("prerender-ready"));
    // Signal to Prerender.io that the page is fully rendered
    (window as any).prerenderReady = true;
  };
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(dispatch, { timeout: 4000 });
  } else {
    setTimeout(dispatch, 500);
  }
}
