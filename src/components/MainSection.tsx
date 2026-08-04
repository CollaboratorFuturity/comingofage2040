import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import orbBg from "@/assets/orb-bg.png";

interface MainItem {
  id: string;
  title: string;
  subtitle: string;
  expandedText: string;
  imageUrl: string;
  route: string;
  color: string;
}

const placeholderItems: MainItem[] = [
  {
    id: "item-1",
    title: "Project",
    subtitle: "",
    expandedText: "RICH_PROJECT",
    imageUrl: "",
    route: "/content/skills",
    color: "#333538",
  },
  {
    id: "item-2",
    title: "Story",
    subtitle: "",
    expandedText:
      "It is the year 2040, a world marked by transformations driven by technological disruption, geopolitical fragmentation, and the accelerating impacts of extreme weather. In this era of continuous change, the traditional markers of adulthood–such as marriage, career, and homeownership–have been delayed, redefined, or even foregone altogether. We introduce four young European activists, Rowan, Nova, Cypher, and Zane, who are communicating from 2040 through specialized voice devices called Orbs. These activists, 20 years old, are navigating a world where maturity is defined less by socio-demographic milestones and more by internal criteria. Each persona tackles different facets of this new transition, challenging contemporary and oncoming future issues. Participants encounter a collection of physical artifacts carried by the activists–a neural interface, a Multispecies communicator, an emotion-sync badge, and other technologies that represent the necessary future markers of adulthood. These objects become intimate conversation starters, offering windows into the fluid and customizable identities and unique challenges facing the future generation.",
    imageUrl: "",
    route: "/content/resilience",
    color: "#853042",
  },
  {
    id: "item-3",
    title: "Experience",
    subtitle: "",
    expandedText:
      "Coming of Age 20/40 is an immersive, touchable experience built around physical objects that participants can hold, examine, and interact with. It dissolves the barrier between today and tomorrow, inviting participants to explore the emerging realities of youth in this future landscape. We also created an online version where you can explore the objects simply by clicking on them and talk directly with the personas. At its core, this is a design experiment for policy makers, a way to think alternatively about the challenges young Europeans will face and what support systems must emerge today. The goal is that participants don't just discuss theoretical scenarios, they have intimate conversations with the youth from the future.",
    imageUrl: "",
    route: "/content/intimacy",
    color: "#deb8e3",
  },
  {
    id: "item-4",
    title: "Action",
    subtitle: "",
    expandedText:
      "Watch the video to see how participants interact with the experience.",
    imageUrl: "",
    route: "https://vimeo.com/1146519669?fl=ip&fe=ec",
    color: "#D3D3D3",
  },
];

interface MainSectionProps {
  onCTAClick?: () => void;
}

const MainSection = ({ onCTAClick }: MainSectionProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const activeId = isMobile ? tappedId : hoveredId;

  return (
    <section className="min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 xl:px-16 2xl:px-24 py-8 xl:py-0 snap-start relative overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat opacity-[0.3] pointer-events-none"
        style={{ backgroundImage: `url(${orbBg})`, backgroundSize: '50%', backgroundPosition: 'right center' }}
      />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Items */}
        <div className="space-y-4 mb-12">
          {placeholderItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="border-b border-border/30 pb-4 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => !isMobile && setHoveredId(item.id)}
              onMouseLeave={() => !isMobile && setHoveredId(null)}
              onClick={() => {
                if (isMobile) {
                  if (item.id === "item-1" || item.id === "item-2" || item.id === "item-3") {
                    setTappedId(tappedId === item.id ? null : item.id);
                    return;
                  }
                }
                if (item.id === "item-1" || item.id === "item-2" || item.id === "item-3") {
                  return;
                }
                if (item.route.startsWith("http")) {
                  window.open(item.route, "_blank", "noopener,noreferrer");
                } else {
                  navigate(item.route);
                }
              }}
            >
              <div className="flex items-center gap-6">
                {/* Placeholder image area */}
                <div className="w-2 xl:w-3 h-16 xl:h-20 flex-shrink-0 rounded-full overflow-hidden">
                  <div className="w-full h-full" style={{ backgroundColor: item.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl xl:text-2xl font-normal text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-thin">{item.subtitle}</p>

                  <AnimatePresence>
                    {activeId === item.id && (
                      <motion.div
                        className="text-sm text-foreground/70 mt-2 font-thin normal-case"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {item.expandedText === "RICH_PROJECT" ? (
                          <p>
                            Coming of Age 2040 is a part of{" "}
                            <a
                              href="https://www.futuresgarden.eu/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-foreground"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Futures Garden
                            </a>
                            , a project by the European Commission{" "}
                            <a
                              href="https://policy-lab.ec.europa.eu/index_en"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-foreground"
                              onClick={(e) => e.stopPropagation()}
                            >
                              EU Policy Lab
                            </a>{" "}
                            to explore how speculative design could be applied to policy makers. This particular project specifically explores the topic of the future of youth transition into adulthood, and how we might create experiences to engage policy makers.{" "}
                            <a
                              href="https://futurity.science/data-stories/adulthood"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-foreground"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Read more about Futurity System's research into this topic
                            </a>.
                          </p>
                        ) : (
                          <p>{item.expandedText}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={onCTAClick}
            className="px-6 sm:px-8 py-3 sm:py-4 border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-xs sm:text-sm tracking-widest"
          >
            EXPERIENCE THE ONLINE VERSION
          </button>
        </motion.div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <Link
            to="/privacy"
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground underline transition-colors"
          >
            Privacy Notice
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default MainSection;
