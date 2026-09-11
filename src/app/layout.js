import "./globals.css";

// Payment aane par ise false kar dena
const IS_DEVELOPMENT = true;

export const metadata = {
  title: "Under Development",
  description: "Website is currently under development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased select-none m-0 p-0">
        {IS_DEVELOPMENT ? (
          <div className="fixed inset-0 z-[999999] bg-[#052516] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans cursor-default">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                This Site Is Under Development
              </h1>
              <p className="text-sm sm:text-base text-emerald-200/80 font-medium">
                It will be live shortly.
              </p>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}