import React, { useEffect, useState } from "react";
import Header from "../sections/header";
import Footer from "../sections/footer";
import { Projectsettings } from "../shared/projectSettigs";
import { motion } from "framer-motion";
import Metadata from "../assets/metadata";
import { Speedsize, GetStoreId } from "../shared/projectSettigs";
import SchemaMarkup from "../assets/schemaMarkup";
import HeaderTags from "../assets/headertags";

type LayoutProps = {
  children: React.ReactNode;
};

interface StoreDataProps {
  S_Name: string;
  S_Descr: string;
  Logo: string;
  F_ID: number;
  Phone: string;
  Location: string;
}

const Layout = ({ children }: LayoutProps) => {
  const [isProjectSettingsLoaded, setIsProjectSettingsLoaded] = useState(false);
  const [storeId, Api] = GetStoreId();
  const [storeData, setStoreData] = useState<StoreDataProps | null>(null);

  useEffect(() => {
    if (storeId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${Api}/api/basicUserData?storeId=${storeId}`
          );
          const result = await response.json();
          console.log(result[0]);
          setStoreData(result[0]);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [storeId]);

  const handleProjectSettingsFinishLoading = () => {
    setIsProjectSettingsLoaded(true);
  };
  const pageData = storeData
    ? {
        name: storeData.S_Name,
        image: Speedsize(
          `${Api}/ireserve/dashboard/images/${storeData.Logo}`,
          800
        ),
        description: storeData.S_Descr,
        url: window.location.href,
        author: "Vincent Okpechi | iReserve Shop",
      }
    : {
        name: "Portfoloe by Ireserve",
        image: "/ireserve.svg",
        description: "This page should serve your business needs properly",
        url: window.location.href,
        author: "Vincent Okpechi",
      };

  return (
    <>
      <Projectsettings onFinishLoading={handleProjectSettingsFinishLoading} />
      <Metadata
        title={pageData.name}
        description={pageData.description}
        keywords={[
          pageData.name,
          "ireserve shop",
          "ireserve",
          "ireserve links page",
          "ireserve.shop",
        ]}
        image={pageData.image}
        url={pageData.url}
        author={pageData.author}
      />
      <HeaderTags />
      <SchemaMarkup storeData={storeData} />
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
