import { Outlet } from "react-router-dom";

/**
 * Minimal layout for immersive game pages (slot machines).
 * No header, footer, sidebars, or any layout constraints.
 * Occupies full viewport: 100vw x 100vh.
 */
export function GameLayout() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-auto">
      <Outlet />
    </div>
  );
}
