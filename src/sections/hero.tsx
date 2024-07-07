import { useState, useEffect } from "react";
import SocialMedia from "./socialmedia";
import { Speedsize, GetStoreId } from "../shared/projectSettigs";
import { LoadingImageCircle } from "../shared/projectCards";

interface StoreDataProps {
  S_Name: string;
  S_Descr: string;
  Logo: string;
  F_ID: number;
  Phone: string;
  Location: string;
}

const HeroSection = () => {
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
    <div className='font-["Montserrat"]'>
      <div className="w-full h-auto flex self-center flex-col items-center justify-center px-[20px] pt-[40px] pb-[20px] gap-[24px] ">
        {storeData?.Logo ? (
          <img
            src={Speedsize(
              `${Api}/ireserve/dashboard/images/${storeData.Logo}`,
              1920
            )}
            alt={`${storeData.S_Name} main Logo`}
            width={126}
            height={126}
            className="flex shadow-lg rounded-[126px] border border-gray-100 object-cover object-top"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        ) : (
          <LoadingImageCircle />
        )}
        <div className="flex flex-col gap-[16px] md:gap-[20px] items-center">
          {storeData ? (
            <h1 className="text-[24px] md:text-[28px] leading-[38px] flex flex-col items-center text-center w-full h-auto max-h-[calc(28px*1.4*2)] overflow-hidden text-gray-900 capitalize font-bold">
              {storeData.S_Name}
            </h1>
          ) : null}
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
