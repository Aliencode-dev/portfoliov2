import { useState, useEffect } from "react";
import { GetStoreId, Speedsize } from "../shared/projectSettigs";
import { LoadingImageSquare } from "../shared/projectCards";

interface StoreDataProps {
  S_Name: string;
  S_Descr: string;
  Logo: string;
  F_ID: number;
  Phone: string;
  Location: string;
  banner: string;
}

const About = () => {
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

  return (
    <>
      <div className="flex flex-col self-center overflow-hidden bg-white w-full h-auto rounded-lg md:p-[30px] p-[20px] gap-[20px]">
        <div className="flex flex-col">
          <h1 className="text-[20px] font-medium text-gray-900">About Us</h1>
          {storeData && (
            <article className="text-[14px] font-normal text-gray-600">
              {storeData.S_Descr}
            </article>
          )}
        </div>
        {storeData && (
          <div className="relative w-full md:h-64 h-[200px] border border-white rounded-lg">
            {storeData.banner &&
              (() => {
                const bannerData = JSON.parse(storeData.banner);
                return bannerData.landscape ? (
                  <img
                    className="w-full rounded-lg h-full object-cover object-center border border-white"
                    src={Speedsize(
                      `${Api}/ireserve/dashboard/images/${bannerData.landscape}`,
                      1920
                    )}
                    alt={`${storeData.S_Name} Banner`}
                    sizes="100vw"
                  />
                ) : (
                  <LoadingImageSquare />
                );
              })()}
          </div>
        )}
      </div>
    </>
  );
};

export default About;
