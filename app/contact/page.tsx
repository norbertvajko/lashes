import { NewsletterSection } from "@/components/general/newsletter-section";
import contactModelImg from "../../assets/images/model-contact.png";
import { Suspense } from "react";
import PageLoader from "@/components/page-loader";
import { ContactForm } from "./_components/ContactForm";
import { useIsMobile } from "@/hooks/use-is-mobile";

const ContactPage = async () => {

	const isMobile = useIsMobile();

	return (
		<Suspense fallback={<PageLoader />}>
			<div className="flex flex-col">
				<div className="flex flex-col md:flex-row bg-black h-screen">
					<div className={isMobile ? "md:w-2/5 w-full h-1/2 md:h-full mb-[208px]" : "md:w-2/5 w-full h-1/2 md:h-full"}>
						<img src={contactModelImg.src} alt="Contact Model" className="w-full h-full object-contain pt-[74px] md:pt-0" />
					</div>
					<ContactForm />
				</div>
				<NewsletterSection />
			</div>
		</Suspense>
	)
};

export default ContactPage;