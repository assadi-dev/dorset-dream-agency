import NavbarCatalogue from "../catalogue/_components/header/NavbarCatalogue";
import HeroSection from "../catalogue/_components/header/HeroSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertiesSection from "../catalogue/_components/main/PropertiesSection";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/effect-fade";
import AboutSection from "../catalogue/_components/main/AboutSection";

export default async function CataloguePage() {
    return (
        <>
            <HeroSection />
            <PropertiesSection />
            <AboutSection />
        </>
    );
}
