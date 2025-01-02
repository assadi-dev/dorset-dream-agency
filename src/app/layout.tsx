import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import { setTitlePage } from "@/lib/utils";
import PageTopLoader from "@/components/loader/PageTopLoader";
import { Toaster } from "@/components/ui/sonner";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/a11y";
import "swiper/css/controller";
import "swiper/css/autoplay";
import "swiper/css/zoom";

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

const roboto = Roboto({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
    weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased bg-primary-foreground`}
            >
                <PageTopLoader />
                <QueryClientProvider>{children}</QueryClientProvider>
                <Toaster theme="light" richColors closeButton />
            </body>
        </html>
    );
}
