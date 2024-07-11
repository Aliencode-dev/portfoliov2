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
        name: "Portfoliov2 by Ireserve",
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
        <div className="bg-white h-full flex flex-col items-center">
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            role="status"
            className="w-full flex flex-col items-center h-full bg-white fixed space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 p-6"
          >
            <div className="w-full max-w-[1040px] flex flex-col items-center gap-8">
              <div
                role="status"
                className="space-y-8 animate-pulse flex flex-col items-center  w-full md:w-[60%]"
              >
                <div className="flex items-center justify-center w-48 h-48 bg-gray-300 rounded-full dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
              <div className="w-full flex flex-col items-center gap-5">
                {" "}
                {[...Array(5)].map((_, index) => (
                  <div
                    className="flex w-full items-center justify-between pt-4"
                    key={index}
                  >
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                ))}
              </div>
            </div>

            <span className="sr-only">Loading...</span>
          </motion.div>
        </div>
      )}
      <div
        className={`${
          isProjectSettingsLoaded ? "opacity-100" : "opacity-0"
        } w-screen flex flex-col h-full relative`}
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
