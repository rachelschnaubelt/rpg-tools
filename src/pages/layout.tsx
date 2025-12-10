import Header from "@/components/header/header";
import "./globals.css";
import Footer from "@/components/footer/footer";
import { useEffect, useRef, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(0);

  const resizeHandler = () => {
    setHeaderHeight(headerRef.current?.clientHeight);
  }

  useEffect(() => {
    addEventListener('resize', resizeHandler);
    resizeHandler();

    return (() => removeEventListener('resize', resizeHandler));
  }, [])

  return (
    <html
      lang="en"
      className={`h-full`}>
      <body
        style={{ marginTop: `${headerHeight}px` }}
        className="min-h-full flex">
        <Header
          className="px-8" ref={headerRef} />
        <main
          className="grow px-8 py-5">
          {children}
        </main>
        {/* <Footer className="px-8"/> // footer isn't really needed right now*/}
      </body>
    </html>
  );
}
