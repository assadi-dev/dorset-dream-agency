import HeroSection from "./_components/header/HeroSection";
import PropertiesSection from "./_components/main/PropertiesSection";
import AboutSection from "./_components/main/AboutSection";
import HeroSearchFilter from "./_components/header/HeroSearchFilter/HeroSearchFilter";

export default async function CataloguePage() {
    return (
        <>
            <HeroSection />
            <main className="w-full p-5 sm:p-8 2xl:max-w-[1800px] mx-auto">
                <HeroSearchFilter />
                <PropertiesSection />
                <AboutSection />
            </main>
        </>
    );
}
