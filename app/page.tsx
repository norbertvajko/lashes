import React, { Suspense } from "react";
import { BannerComponent } from "@/components/general/banner-component";
import { Navbar } from "@/components/general/navbar";
import PageLoader from "@/components/page-loader";
import FooterComponent from "@/components/general/footer-component";
import { NewsletterComponent } from "@/components/general/newsletter-component";
import { TestimonialsComponent } from "@/components/general/testimonials-component";
import GalleryComponent from "@/components/general/gallery-component";
import { CoursesComponentDemo } from "@/components/general/courses-c";
import AbutMeComponent from "@/components/general/courses-component";
import { WhatsappContact } from "@/components/general/whatsapp-contact";

const Home = async () => {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <header>
          <Navbar />
          <BannerComponent />
        </header>
        <main className="pb-6">
          <div className="pt-0 sm:pt-7">
            <CoursesComponentDemo />
            <AbutMeComponent />
            <GalleryComponent />
            <NewsletterComponent />
            <TestimonialsComponent />
            {/* <SocialLinks /> */}
          </div>
        </main>
        <footer>
          <FooterComponent />
        </footer>
      </Suspense>
      <WhatsappContact />
    </>
  );
};

export default Home;
