import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const ThreeDMarquee = ({ images, className }) => {
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      <div className="flex w-full h-full items-center justify-center">
        <div 
          className="shrink-0"
          style={{ 
            width: "1720px", 
            height: "1720px",
            transform: "scale(0.5)",
          }}
        >
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              transformStyle: "preserve-3d",
              width: "100%",
              height: "100%",
            }}
            className="relative grid grid-cols-4 gap-8"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
              >
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <motion.img
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="rounded-lg object-cover ring-1 ring-white/10 hover:shadow-2xl hover:ring-white/20 transition-all"
                      style={{ 
                        width: "400px", 
                        height: "300px",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDMarquee;
