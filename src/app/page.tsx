import NavbarCatalogue from "./catalogue/_components/header/NavbarCatalogue";
import HeroSection from "./catalogue/_components/header/HeroSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertiesSection from "./catalogue/_components/main/PropertiesSection";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/effect-fade";
import ContactSection from "./catalogue/_components/main/ContactSection";
import FooterSection from "./catalogue/_components/main/FooterSection";

export default async function CataloguePage() {
    return (
        <>
            <div className="relative grid grid-rows-[auto_auto_1fr_auto] items-center justify-items-center min-h-screen  pb-20 gap-5 font-[family-name:var(--font-geist-sans)] pt-3 p-5 lg:px-12">
                <NavbarCatalogue />

                <HeroSection />

                <main className="w-full">
                    <PropertiesSection />
                    <ContactSection />
                </main>
            </div>
            <FooterSection />
        </>
    );
}
