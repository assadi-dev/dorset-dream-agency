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
            <header className="p-3 sm:p-8">
                <NavbarCatalogue />

                <HeroSection />
            </header>

            <main className="w-full p-5 sm:p-8">
                <PropertiesSection />
                <ContactSection />
            </main>

            <FooterSection />
        </>
    );
}
