import { BackButton } from "@/components/general/back-button";
import CommandsSection from "../_components/comments-sections";

const BlogPostPage = async ({ slug }: any) => {

    return (
        <div className="max-w-screen-lg mx-auto">
            <BackButton />
            <div className="mt-[150px]">
                {/* Header Section */}
                <div className="mb-8 md:mb-12 w-full mx-auto relative">
                    <div className="px-4 lg:px-0">
                        <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-4">
                            Regulile de purtare și îngrijire a extensiilor de gene
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Tot ce trebuie să știi pentru a menține extensiile de gene impecabile și sănătatea genelor naturale.
                        </p>
                    </div>
                    <img
                        alt="gene extensii"
                        src="/assets/images/blog-banner.jpg"
                        className="w-full object-cover lg:rounded mt-6 shadow-lg h-[10em] lg:h-[30em]"
                    />
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row lg:space-x-12">

                    {/* Left Section: Blog Content */}
                    <div className="px-4 lg:px-0 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                        <h2 className="text-3xl font-semibold mb-6">Cum să ai grijă de extensiile tale de gene</h2>
                        <p className="pb-6">
                            Extensiile de gene sunt un mod minunat de a accentua privirea și de a economisi timp dimineața.
                            Totuși, pentru a le menține sănătoase și aspectul impecabil, este esențial să urmezi câteva reguli de bază.
                        </p>
                        <ul className="list-disc pl-6 pb-6">
                            <li><strong>Evită apa</strong> în primele 48 de ore pentru a permite adezivului să se fixeze.</li>
                            <li><strong>Curățare zilnică</strong>: Utilizează o spumă specială pentru extensii de gene pentru a evita acumularea de murdărie.</li>
                            <li><strong>Evită frecarea ochilor</strong> pentru a preveni deteriorarea extensiilor și pierderea genelor naturale.</li>
                        </ul>

                        <h2 className="text-3xl font-semibold mb-6 mt-10">Îngrijirea genelor naturale după laminare</h2>
                        <p className="pb-6">
                            Laminarea este o tehnică minunată care oferă volum și curbură genelor naturale. Cu toate acestea, pentru a
                            prelungi efectul laminării, este important să urmezi o rutină corespunzătoare.
                        </p>
                        <ul className="list-disc pl-6 pb-6">
                            <li><strong>Hidratează genele</strong> cu uleiuri naturale pentru a le păstra sănătoase.</li>
                            <li><strong>Evită produse grase</strong>, deoarece acestea pot degrada tratamentul laminării.</li>
                            <li><strong>Curățare delicată</strong>: Folosește produse fără ulei și evită frecarea excesivă.</li>
                        </ul>

                        <blockquote className="border-l-4 border-green-500 pl-4 italic rounded bg-green-50 text-green-700 p-4 my-6">
                            „Frumusețea nu este doar despre aspectul exterior, ci și despre cum îți îngrijești sănătatea interioară.”
                        </blockquote>

                        <h3 className="text-2xl font-semibold mt-10">Recomandări suplimentare</h3>
                        <p className="pb-6">
                            Pe lângă respectarea regulilor de mai sus, îți recomandăm să vizitezi periodic un specialist pentru întreținerea
                            extensiilor sau pentru tratamente de regenerare a genelor naturale.
                        </p>
                    </div>

                    {/* Right Section: Author Info */}
                    <div className="w-full lg:w-1/4 mt-12 lg:mt-0">
                        <div className="p-6 border border-gray-200 rounded-lg shadow-lg">
                            <div className="flex items-center mb-4">
                                <img
                                    alt="author"
                                    src="../assets/images/lari-img.jpg"
                                    className="h-12 w-12 lg:w-16 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">Larisa Tonta</p>
                                    <p className="text-sm text-gray-600">Expert în îngrijirea genelor</p>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                Larisa Tonta îți oferă cele mai bune sfaturi pentru îngrijirea genelor, combinând experiența profesională
                                cu cele mai noi tehnici din domeniu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <CommandsSection />
        </div>
    );
}

export default BlogPostPage;