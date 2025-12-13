import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Gamepad2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Casino Bonus Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for casino bonus comparisons and reviews.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Top Casinos
                </Link>
              </li>
              <li>
                <Link
                  to="/bonus-guide"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Bonus Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Responsible Gaming</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/responsible-gaming"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Play Responsibly
                </Link>
              </li>
              <li>
                <a
                  href="https://www.gamcare.org.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  GamCare
                </a>
              </li>
              <li>
                <a
                  href="https://www.begambleaware.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  BeGambleAware
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Casino Bonus Hub. All rights reserved.
            Gambling can be addictive. Please play responsibly. 18+
          </p>
        </div>
      </div>
    </footer>
  );
}
