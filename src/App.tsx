import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroSection from "./sections/hero";
import AboutSection from "./sections/about";
import CallToAction from "./sections/cta";
import Contact from "./sections/contact";

interface SectionProps {
  children: ReactNode;
  id: string;
}

const Section: React.FC<SectionProps> = ({ children, id }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section id={id} className="w-full h-auto max-w-[1040px] p-[20px] z-0">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
        className="w-full h-full flex flex-col justify-center items-center"
      >
        {children}
      </motion.div>
    </section>
  );
};

function App() {
  return (
    <div className="h-full w-full flex flex-col relative items-center md:px-[24px] max-w-[1040px]">
      <section id="top" className="w-full h-auto z-0">
        <HeroSection />
      </section>
      <Section id="about">
        <AboutSection />
      </Section>
      <Section id="cta">
        <CallToAction />
      </Section>
      <Section id="contact">
        <Contact />
      </Section>
    </div>
  );
}

export default App;
