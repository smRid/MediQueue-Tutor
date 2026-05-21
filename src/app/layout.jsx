import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "MediQueue - Tutor Booking System",
  description:
    "Book expert tutors for online and offline learning sessions. Browse subjects, schedule classes, and manage your learning journey with MediQueue.",
};

function DynamicTitle() {
  return null;
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              className:
                "!bg-card !text-card-foreground !border !border-border !shadow-lg",
              duration: 3000,
            }}
          />
          <DynamicTitle />
          <div id="navbar-slot" />
          <main className="flex-1">{children}</main>
          <div id="footer-slot" />
        </ThemeProvider>
      </body>
    </html>
  );
}
