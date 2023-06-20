import Header from "./components/header";
import { Providers } from "./components/providers";

export const metadata = {
  title: "To Do App for Learning",
  description: "This app is for learning purpose",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
