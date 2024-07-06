import React, { useState } from "react";
import Header from "../sections/header";
import Footer from "../sections/footer";
import { Projectsettings } from "../shared/projectSettigs";
import { motion } from "framer-motion";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isProjectSettingsLoaded, setIsProjectSettingsLoaded] = useState(false);

  const handleProjectSettingsFinishLoading = () => {
    setIsProjectSettingsLoaded(true);
  };

  return (
    <>
      <Projectsettings onFinishLoading={handleProjectSettingsFinishLoading} />
      {!isProjectSettingsLoaded && (
        <div className="bg-white h-screen">
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            role="status"
            className="w-full h-full bg-white fixed space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 p-6 dark:border-gray-700"
          >
            {[...Array(10)].map((_, index) => (
              <div
                className="flex items-center justify-between pt-4"
                key={index}
              >
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
            ))}
            <span className="sr-only">Loading...</span>
          </motion.div>
        </div>
      )}
      <div
        className={`${
          isProjectSettingsLoaded ? "opacity-100" : "opacity-0"
        } w-full flex flex-col h-full relative`}
      >
        <Header />
        <main className="w-full h-full flex flex-col relative items-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
