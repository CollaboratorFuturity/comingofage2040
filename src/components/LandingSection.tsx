import { motion } from "framer-motion";
import AnimatedNumbersBackground from "@/components/AnimatedNumbersBackground";

interface LandingSectionProps {
  onScrollDown?: () => void;
}

const LandingSection = ({ onScrollDown }: LandingSectionProps) => {
  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden snap-start bg-black">
      {/* Background image */}
      <div className="absolute inset-0 opacity-60 -translate-y-36">
        <AnimatedNumbersBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mt-[calc(4rem+60px)] sm:mt-[calc(6rem+60px)] md:mt-[calc(9rem+60px)] lg:mt-[calc(12rem+60px)]">
        <motion.h1
          className="text-white text-[2.25rem] sm:text-[2.75rem] md:text-[3rem] xl:te:text-[5.5rem] font-bold mb-3 md:mb-4 leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Coming of age 20/40
        </motion.h1>
        <motion.p
          className="text-white/80 text-xs sm:tesm md:text-base xl:te xlxt-lg font-thin max-w-2xl mx-auto whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Conversation with our Future:{"\n"}An exploration of adulthood shaped by AI,{"\n"}climate change, radical connectivity and more.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={onScrollDown}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default LandingSection;
