import { motion } from "framer-motion";
import { HoverableImage } from "./HoverableImage";
import { AspectRatio } from "./ui/aspect-ratio";
interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  size?: number;
  w?: number;
  h?: number;
  visible?: boolean;
}
interface ScenarioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  hotspots: Hotspot[];
  agentId: string;
  tooltipColor?: string;
  tooltipTitleColor?: string;
}
export const ScenarioCard = ({
  title,
  description,
  imageUrl,
  hotspots,
  agentId,
  tooltipColor,
  tooltipTitleColor
}: ScenarioCardProps) => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} transition={{
    duration: 0.4
  }} className="space-y-4">
      {/* Full Width Image Section */}
      <div className="space-y-4 flex flex-col items-center w-full">
        <div className="w-full max-w-[1500px]">
          <AspectRatio ratio={3 / 2}>
            <HoverableImage imageUrl={imageUrl} hotspots={hotspots} alt={title} tooltipColor={tooltipColor} tooltipTitleColor={tooltipTitleColor} />
          </AspectRatio>
        </div>
        
        
      </div>
    </motion.div>;
};