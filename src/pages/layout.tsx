import Header from "@/components/header/header";
import "./globals.css";
import Footer from "@/components/footer/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`h-full`}>
      <body
        className="min-h-full flex">
        <Header 
          className="px-8" />
        <main
          className="grow mt-9 px-8 py-5">
          {children}
        </main>
        {/* <Footer className="px-8"/> // footer isn't really needed right now*/}
      </body>
    </html>
  );
}
