import localFont from "next/font/local";
import "./globals.css";
import { setTitlePage } from "@/lib/utils";
import PageTopLoader from "@/components/loader/PageTopLoader";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = setTitlePage("Catalogue");

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-foreground`}>
                <PageTopLoader />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
