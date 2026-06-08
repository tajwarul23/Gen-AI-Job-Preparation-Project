import { lazy, Suspense } from "react";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import LastBanner from "./LastBanner";
import SpinLoader from "../../Shared/SpinLoader";

const ResumeBanner = lazy(() => import("./ResumeBanner"));
const PrevReportBanner = lazy(() => import("./PrevReportBanner"));

const HomePage = () => {
  return (
    <div className="relative min-h-screen max-w-7xl mx-auto overflow-x-hidden">
      <Hero />
      <Features />
      <ResumeBanner />
      <Suspense fallback={<SpinLoader />}>
        <PrevReportBanner />
      </Suspense>
      <Suspense fallback={<SpinLoader />}>
        <LastBanner />
      </Suspense>
      <Footer />
    </div>
  );
};

export default HomePage;
