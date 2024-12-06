import { useScroll } from "framer-motion";
import { motion } from "framer-motion";

function UseScroll() {
  const { scrollYProgress } = useScroll();

  return (
    <div>
      <motion.div
        style={{
          height: "4px",
          backgroundColor: "#3b82f6",
          scaleX: scrollYProgress,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

export default UseScroll;
