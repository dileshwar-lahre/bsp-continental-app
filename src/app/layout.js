import "./globals.css";

// ⚠️ Website band rakhne ke liye true rakhein, payment aane par false kar dena
const IS_MAINTENANCE = true;

export const metadata = {
  title: "Site Unavailable",
  description: "Temporary maintenance in progress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased select-none m-0 p-0">
        {IS_MAINTENANCE ? (
          <a
            href="https://stonenox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed inset-0 z-[999999] bg-[#052516] text-white flex flex-col items-center justify-center p-6 text-center cursor-pointer no-underline select-none font-sans"
          >
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                This Site Is Unavailable Right Now
              </h1>
              <p className="text-sm sm:text-base text-emerald-200/80 font-medium">
                Stonenox is managing the issue and it will be resolved shortly.
              </p>
            </div>
          </a>
        ) : (
          children
        )}
      </body>
    </html>
  );
}