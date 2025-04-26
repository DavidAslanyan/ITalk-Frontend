import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";
import QueryProvider from "./providers/QueryProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";


export const metadata: Metadata = {
  title: "Solaris Client"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <QueryProvider>    
              {children}
            </QueryProvider>
          </GoogleOAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
