import AuthDropdown from "../components/AuthDropdown"
import "./globals.css";

export const metadata = {
  title: "AdsMaster AI",
  description: "AI Powered Google Ads Automation Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
              {children}
      </body>
    </html>
  );
}