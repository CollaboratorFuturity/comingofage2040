import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  size?: number; // Size percentage (default: 3%) - used for both w and h if w/h not specified
  w?: number; // Width as percentage of image width (default: size or 3)
  h?: number; // Height as percentage of image height (default: size or 3)
  visible?: boolean; // Show circle and number (default: true)
}

interface HoverableImageProps {
  imageUrl: string;
  hotspots: Hotspot[];
  alt: string;
  tooltipColor?: string; // Color for tooltip border
  tooltipTitleColor?: string; // Color for tooltip title text (defaults to tooltipColor)
}

export const HoverableImage = ({ imageUrl, hotspots, alt, tooltipColor, tooltipTitleColor }: HoverableImageProps) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Calculate tooltip position based on hotspot position and container bounds
  const getTooltipPosition = (hotspot: Hotspot) => {
    if (!containerRef.current) return { left: `${mousePos.x + 20}px`, top: `${mousePos.y + 20}px` };

    const offset = 20;
    let left = mousePos.x + offset;
    let top = mousePos.y + offset;

    // If hotspot is in bottom 20% of image, position tooltip above mouse
    if (hotspot.y > 70) {
      const tooltipHeight = 150; // estimated tooltip height
      top = mousePos.y - tooltipHeight - offset;
    }

    // If hotspot is in rightmost 20% of image, position tooltip left of mouse
    if (hotspot.x > 70) {
      const tooltipWidth = 300; // estimated tooltip width
      left = mousePos.x - tooltipWidth - offset;
    }

    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  // Calculate animation direction based on hotspot position
  const getAnimationVariants = (hotspot: Hotspot) => {
    return {
      x: hotspot.x > 80 ? 10 : 0,
      y: hotspot.y > 80 ? -10 : 10,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-lg border border-border/50 bg-card"
      onMouseMove={handleMouseMove}
    >
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />

      {hotspots.map((hotspot) => {
        const widthPercent = hotspot.w || hotspot.size || 3; // Default to 3% of image width
        const heightPercent = hotspot.h || hotspot.size || 3; // Default to 3% of image height
        const halfWidthPercent = widthPercent / 2;
        const halfHeightPercent = heightPercent / 2;
        const isVisible = hotspot.visible !== false; // Default to true

        return (
          <div key={hotspot.id}>
            <motion.button
              className={`absolute rounded-lg cursor-pointer ${
                isVisible ? "bg-primary/20 border-2 border-primary backdrop-blur-sm" : "bg-transparent border-0"
              }`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${widthPercent}%`,
                height: `${heightPercent}%`,
                marginLeft: `-${halfWidthPercent}%`,
                marginTop: `-${halfHeightPercent}%`,
                boxShadow: isVisible ? undefined : "none",
              }}
              onMouseEnter={() => setActiveHotspot(hotspot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
              whileHover={isVisible ? { boxShadow: "0 0 20px hsl(var(--primary) / 0.6)" } : {}}
            >
              {isVisible && (
                <span className="absolute inset-0 flex items-center justify-center text-primary text-xs font-bold">
                  {hotspot.id}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {activeHotspot === hotspot.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, ...getAnimationVariants(hotspot) }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, ...getAnimationVariants(hotspot) }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 bg-card/95 backdrop-blur-md rounded-lg p-4 shadow-lg max-w-xs pointer-events-none"
                  style={{
                    ...getTooltipPosition(hotspot),
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: tooltipColor || "hsl(var(--primary) / 0.3)",
                  }}
                >
                  <h4
                    className="font-semibold mb-1 normal-case"
                    style={{ color: tooltipTitleColor || tooltipColor || "hsl(var(--primary))" }}
                  >
                    {hotspot.label}
                  </h4>
                  <p className="text-sm text-muted-foreground normal-case">{hotspot.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
