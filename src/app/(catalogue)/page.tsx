import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/effect-fade";
import HeroSection from "./_components/header/HeroSection";
import PropertiesSection from "./_components/main/PropertiesSection";
import AboutSection from "./_components/main/AboutSection";

export default async function CataloguePage() {
    return (
        <>
            <HeroSection />
            <PropertiesSection />
            <AboutSection />
        </>
    );
}
