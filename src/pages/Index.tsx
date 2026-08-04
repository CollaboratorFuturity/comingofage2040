import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScenarioCard } from "@/components/ScenarioCard";
import zaneImage from "@/assets/zane.png";
import rowanImage from "@/assets/rowan.png";
import novaImage from "@/assets/nova.png";
import cypherImage from "@/assets/cypher.png";
import knollingImage from "@/assets/knolling_4.png";
import comingOfAgeSvg from "@/assets/coming_of_age_BOLD_3.svg";
import rotatingMessages from "@/data/rotatingMessages.json";
import { VoiceConsentModal, hasVoiceConsent, grantVoiceConsent } from "@/components/VoiceConsentModal";


// Mock data - replace with your actual scenarios
const scenarios = [
  {
    id: "scenario-1",
    title: "Zane",
    description: "Talk to Zane about skills and learning in 2040.",
    imageUrl: zaneImage,
    agentId: "uHlKfBtzRYokBFLcCOjq",
    tooltipColor: "#333538",
    // Replace with actual ElevenLabs agent ID
    hotspots: [
      {
        id: "1",
        x: 22,
        y: 63,
        size: 14,
        w: 33,
        h: 68,
        visible: false,
        label: "Zane's Backpack",
        description: "First major purchase without algorithmic optimization. How do you know a choice is truly yours?",
      },
      {
        id: "2",
        x: 58,
        y: 32,
        size: 1,
        w: 9,
        h: 19,
        visible: false,
        label: "EQ-IQ Ring",
        description:
          "Tracks emotions and alerts when he's being fake. What's the difference between feeling and performing?",
      },
      {
        id: "3",
        x: 57,
        y: 57,
        size: 1,
        w: 18,
        h: 18,
        visible: false,
        label: "Eurorail Pass",
        description: "Free travel pass given to all EU citizens at 20. Curious about his journey across Europe?",
      },
      {
        id: "4",
        x: 52,
        y: 85,
        size: 1,
        w: 13,
        h: 20,
        visible: false,
        label: "Neural Link",
        description: "Dockable implant connecting him to his AI twin. What's it like living alongside your AI?",
      },
      {
        id: "5",
        x: 80,
        y: 85,
        size: 1,
        w: 31,
        h: 20,
        visible: false,
        label: "Task Ledger",
        description:
          "Holographic device that delegates work to AI and gig workers. Wonder what work looks like in 2040?",
      },
      {
        id: "6",
        x: 83,
        y: 50,
        size: 1,
        w: 26,
        h: 43,
        visible: false,
        label: "Synaesthetic Cookbook",
        description:
          "Grandmother's unfinished book about food unlocking memories. What's passed down through hands, not files?",
      },
    ],
  },
  {
    id: "scenario-2",
    title: "Rowan",
    description: "Talk to Rowan about resilience and wellbeing in 2040.",
    imageUrl: rowanImage,
    agentId: "agent_01jvs5f45jepab76tr81m51gdx",
    tooltipColor: "#853042",
    hotspots: [
      {
        id: "1",
        x: 17,
        y: 40,
        size: 1,
        w: 11,
        h: 48,
        visible: false,
        label: "Filter Bottle",
        description:
          "Purifies water from any source—rivers, fountains, taps. What does freedom from systems look like?",
      },
      {
        id: "2",
        x: 36,
        y: 35,
        size: 1,
        w: 21,
        h: 38,
        visible: false,
        label: "AIÚA Pendant",
        description:
          "A spirit-like AI that handles digital tasks through whispered conversation. What's the right balance with technology?",
      },
      {
        id: "3",
        x: 57,
        y: 35,
        size: 1,
        w: 15,
        h: 38,
        visible: false,
        label: "Eurorail Pass",
        description: "Free travel pass given to all EU citizens at 20. Curious why she is travelling east?",
      },
      {
        id: "4",
        x: 82,
        y: 41,
        size: 1,
        w: 29,
        h: 52,
        visible: false,
        label: "Intense Magazine",
        description: "A 2030 issue exploring health and living in space. Can stewardship exist without land?",
      },
      {
        id: "5",
        x: 37,
        y: 66,
        size: 1,
        w: 22,
        h: 32,
        visible: false,
        label: "Rowan's Backpack",
        description: "Hand-stitched by a friend before the journey. What does it mean to carry a relationship?",
      },
      {
        id: "6",
        x: 56,
        y: 59,
        size: 1,
        w: 10,
        h: 15,
        visible: false,
        label: "Bio Healing Tape",
        description:
          "Plant-based compounds that bond with skin and promote regeneration. How did your grandmother treat a cut?",
      },
      {
        id: "7",
        x: 63,
        y: 64,
        size: 1,
        w: 6,
        h: 17,
        visible: false,
        label: "Off-grid Survival Kit",
        description:
          "Low-tech essentials for living without digital systems.What does self-reliance actually look like?",
      },
      {
        id: "8",
        x: 14,
        y: 84,
        size: 1,
        w: 19,
        h: 40,
        visible: false,
        label: "Personal Journal",
        description:
          "Hand-bound leather with polaroids and handwritten reflections. Ask about what she's been collecting.",
      },
      {
        id: "9",
        x: 64,
        y: 87,
        size: 1,
        w: 29,
        h: 29,
        visible: false,
        label: "Off-grid Survival Kit",
        description:
          "Low-tech essentials for living without digital systems.What does self-reliance actually look like?",
      },
      {
        id: "10",
        x: 72,
        y: 64,
        size: 1,
        w: 12,
        h: 9,
        visible: false,
        label: "Off-grid Survival Kit",
        description:
          "Low-tech essentials for living without digital systems.What does self-reliance actually look like?",
      },
      {
        id: "11",
        x: 47,
        y: 92,
        size: 1,
        w: 8,
        h: 16,
        visible: false,
        label: "Off-grid Survival Kit",
        description:
          "Low-tech essentials for living without digital systems.What does self-reliance actually look like?",
      },
      {
        id: "12",
        x: 34,
        y: 91,
        size: 1,
        w: 15,
        h: 16,
        visible: false,
        label: "Sliver Soap",
        description:
          "Silver nanoparticles embedded in a lifetime soap that needs only water and friction. Can simplicity be its own kind of technology?",
      },
      {
        id: "13",
        x: 86,
        y: 92,
        size: 1,
        w: 9,
        h: 27,
        visible: false,
        label: "Meshtastic",
        description:
          "Off-grid radio for messaging without cell towers or internet. How do communities stay connected outside the grid?",
      },
    ],
  },
  {
    id: "scenario-3",
    title: "Nova",
    description: "Talk to Nova about intimacy and relationships in 2040.",
    imageUrl: novaImage,
    agentId: "agent_1701k5bgdzmte5f9q518mge3jsf0",
    tooltipColor: "#deb8e3",
    hotspots: [
      {
        id: "1",
        x: 14,
        y: 24,
        size: 1,
        w: 17,
        h: 18,
        visible: false,
        label: "Eurorail Pass",
        description: "Free travel pass given to all EU citizens at 20. Curious about her journey to Bergen?",
      },
      {
        id: "2",
        x: 41,
        y: 32,
        size: 1,
        w: 27,
        h: 33,
        visible: false,
        label: "Emotional Sync Patch",
        description:
          "Translates feelings into signals animals and AI can understand. How do you communicate without words?",
      },
      {
        id: "3",
        x: 13,
        y: 47,
        size: 1,
        w: 25,
        h: 20,
        visible: false,
        label: "Sensory Limitation Visor",
        description:
          "Filters overwhelming sensory input and simulates animal perspectives. Wonder what the world looks like through other eyes?",
      },
      {
        id: "4",
        x: 77,
        y: 64,
        size: 1,
        w: 38,
        h: 72,
        visible: false,
        label: "Nova's Backpack",
        description:
          "Transparent Backpack Carries cat sister Aya Twinkles Moons Calisto. Ask what family looks like to Nova across species?",
      },
      {
        id: "5",
        x: 18,
        y: 80,
        size: 1,
        w: 18,
        h: 35,
        visible: false,
        label: "Cross Species Communicator",
        description: "Speaks in ultrasonic, infrared, and whale song frequencies. What languages are we missing?",
      },
      {
        id: "6",
        x: 42,
        y: 83,
        size: 1,
        w: 22,
        h: 51,
        visible: false,
        label: "The Sentient Family",
        description:
          "Guide to living in multispecies households with AI and animals. Ask about kinship beyond the human.",
      },
    ],
  },
  {
    id: "scenario-4",
    title: "Cypher",
    description: "Talk to Cypher about Identity and autonomy in 2040.",
    imageUrl: cypherImage,
    agentId: "agent_01jvwd88bdeeftgh3kxrx1k4sk",
    tooltipColor: "#ffffff",
    tooltipTitleColor: "#000000",
    hotspots: [
      {
        id: "1",
        x: 26,
        y: 42,
        size: 1,
        w: 42,
        h: 50,
        visible: false,
        label: "Smart Fabric Garment",
        description:
          "Clothing that shifts texture, fit, and form on command. What would you become if you could change at will?",
      },
      {
        id: "2",
        x: 72,
        y: 47,
        size: 1,
        w: 37,
        h: 58,
        visible: false,
        label: "Cypher's Backpack",
        description: "Covered in patches, inherited from a mentor who vanished. What do the patches mean?",
      },
      {
        id: "3",
        x: 20,
        y: 80,
        size: 1,
        w: 25,
        h: 31,
        visible: false,
        label: "Voice Modulator",
        description: "Throat patch that completely alters how they sound. Why does voice matter for identity?",
      },
      {
        id: "4",
        x: 45,
        y: 82,
        size: 1,
        w: 15,
        h: 35,
        visible: false,
        label: "Synthetic Identity Key",
        description:
          "Generates new credentials so no system can pin them down. How do you stay free when everything tracks you?",
      },
      {
        id: "5",
        x: 70,
        y: 90,
        size: 1,
        w: 25,
        h: 35,
        visible: false,
        label: "Zine",
        description:
          "Underground manifesto: ''The Self is a Verb, Not a Noun.'' What does identity liberation look like?",
      },
    ],
  },
];
const Index = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [messageIndices, setMessageIndices] = useState<Record<string, number>>({});
  const [shownMessages, setShownMessages] = useState<Record<string, number[]>>({});
  const [consentGranted, setConsentGranted] = useState<boolean>(() => hasVoiceConsent());
  const [consentPromptFor, setConsentPromptFor] = useState<string | null>(null);


  const getPersonaMessages = (personaTitle: string): string[] => {
    const key = personaTitle.toLowerCase() as keyof typeof rotatingMessages;
    return rotatingMessages[key] || [];
  };

  const handleMessageClick = (personaTitle: string) => {
    const messages = getPersonaMessages(personaTitle);
    if (messages.length <= 1) return;

    // Get already shown indices for this persona (excluding index 0 which is initial)
    const alreadyShown = shownMessages[personaTitle] || [];

    // Available indices: 1 to messages.length-1, minus already shown
    const allIndices = Array.from({ length: messages.length - 1 }, (_, i) => i + 1);
    let available = allIndices.filter((i) => !alreadyShown.includes(i));

    // If all have been shown, reset the pool
    if (available.length === 0) {
      available = allIndices;
      setShownMessages((prev) => ({ ...prev, [personaTitle]: [] }));
    }

    // Pick random from available
    const randomIndex = available[Math.floor(Math.random() * available.length)];

    setMessageIndices((prev) => ({ ...prev, [personaTitle]: randomIndex }));
    setShownMessages((prev) => ({
      ...prev,
      [personaTitle]: [...(prev[personaTitle] || []), randomIndex],
    }));
  };
  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Interactive Scenarios Section */}
      <section
        id="personas-section"
        className="h-screen max-w-[1900px] mx-auto px-6 pt-16 pb-8 overflow-y-auto flex items-start"
      >
        <div className="flex gap-6 w-full h-full">
          {/* Left Panel - Scenario Pickers */}
          <div className="w-56 lg:w-64 xl:w-72 flex-shrink-0 flex flex-col space-y-3 justify-between h-full">
            <div>
              <div className="mb-2">
                <p className="uppercase text-foreground text-sm font-thin">To start, select a future youth.</p>
                <p className="uppercase text-foreground text-sm font-thin hidden min-[720px]:block">
                  Hover over items in the image to learn more.
                </p>
                <p className="uppercase text-foreground text-sm font-thin block min-[720px]:hidden">
                  This experience is better enjoyed on a desktop browser.
                </p>
              </div>
              {scenarios.map((scenario, index) => {
                const isActive = activeTab === scenario.id;
                return (
                  <div key={scenario.id} className="relative">
                    {/* Vertical bar indicator */}
                    <motion.div
                      className="absolute left-2 top-0 w-2"
                      style={{
                        backgroundColor:
                          scenario.title === "Cypher"
                            ? "#D3D3D3"
                            : scenario.tooltipTitleColor || scenario.tooltipColor || "hsl(var(--primary))",
                      }}
                      animate={{
                        height: isActive ? "100%" : 48,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.div
                      onClick={() => setActiveTab(isActive ? null : scenario.id)}
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="group w-full text-left p-4 pl-8 pt-0 rounded-lg transition-all duration-300 cursor-pointer relative"
                    >
                      <h2
                        className={`font-normal text-2xl 2xl:text-3xl transition-colors ${isActive ? "text-foreground" : "text-foreground"}`}
                      >
                        {scenario.title}
                      </h2>
                    </motion.div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            height: 0,
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          className="overflow-hidden pl-8 mt-2"
                        >
                          <p className="2xl:text-sm mb-3 text-foreground text-sm">{scenario.description}</p>
                          {/* ElevenLabs AI Agent Widget — gated behind voice consent */}
                          {consentGranted ? (
                            <div
                              key={scenario.agentId}
                              onClick={(e) => e.stopPropagation()}
                              dangerouslySetInnerHTML={{
                                __html: `<elevenlabs-convai agent-id="${scenario.agentId}" variant="expanded"></elevenlabs-convai>`,
                              }}
                              className="w-full h-[140px] py-[5px] my-[6px]"
                            />
                          ) : (
                            <div className="w-full py-[5px] my-[6px]">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConsentPromptFor(scenario.id);
                                }}
                                className="w-full rounded-lg border border-foreground/30 px-4 py-3 text-sm uppercase text-foreground transition-colors hover:bg-foreground/10"
                              >
                                Start conversation
                              </button>
                            </div>
                          )}

                          <p
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMessageClick(scenario.title);
                            }}
                            className="text-foreground cursor-pointer hover:text-primary transition-colors text-sm pb-5"
                          >
                            {getPersonaMessages(scenario.title)[messageIndices[scenario.title] || 0]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <p className="uppercase text-foreground text-xs font-thin">
              Made by{" "}
              <a href="https://www.futurity.systems" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                futurity systems
              </a>
              {" "}x{" "}
              <a href="https://policy-lab.ec.europa.eu/index_en" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                EU Policy Lab
              </a>
            </p>
          </div>

          {/* Right Panel - Scenario Content */}
          <div className="flex-1 hidden min-[720px]:block">
            {activeTab === null ? (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="w-full h-full flex items-center justify-center relative"
              >
                <img
                  src={knollingImage}
                  alt="Default view"
                  className="max-w-full max-h-full object-contain opacity-15"
                />
                <img src={comingOfAgeSvg} alt="Coming of Age 2040" className="absolute object-contain w-2/5" />
              </motion.div>
            ) : (
              scenarios.map(
                (scenario) =>
                  activeTab === scenario.id && (
                    <motion.div
                      key={scenario.id}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                    >
                      <ScenarioCard {...scenario} />
                    </motion.div>
                  ),
              )
            )}
          </div>
        </div>
      </section>

      <VoiceConsentModal
        open={consentPromptFor !== null}
        onAccept={() => {
          grantVoiceConsent();
          setConsentGranted(true);
          setConsentPromptFor(null);
        }}
        onDecline={() => setConsentPromptFor(null)}
      />
    </div>

  );
};
export default Index;
