import React, { useState, useEffect } from "react";
import styles from "./contact.module.css";
import { MdCallMissedOutgoing } from "react-icons/md";
import { GetStoreId } from "../shared/projectSettigs";

interface StoreDataProps {
  S_Name: string;
  S_Descr: string;
  Logo: string;
  F_ID: number;
  Phone: string;
  Location: string;
}

const Contact = () => {
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

  const about: string = `${
    storeData?.Location
      ? `Our office is located at ${storeData?.Location}.`
      : ""
  } We are waiting, let's start doing great business together. Click button below lets get started.`;
  return (
    <div className="w-full h-auto py-5 px-6">
      <div className="flex flex-col justify-start items-start gap-2">
        <h2 className="text-[20px] p-0 m-0 font-medium text-gray-900">
          Call Us Today
        </h2>
        <p className="text-[14px] p-0 m-0 font-normal text-gray-600">{about}</p>
        <div
          className={`${styles.card} rounded-lg overflow-hidden mt-[10px] relative cursor-pointer flex items-center justify-center font-medium`}
        >
          <div
            className={`${styles.cTxt} text-[16px] leading-[16px] h-full w-full flex flex-row justify-center items-center gap-2`}
          >
            {storeData && storeData.Phone && (
              <a
                className="flex flex-row gap-2"
                href={`tel:${storeData.Phone}`}
                aria-label={`Call us at ${storeData.Phone}`}
              >
                Call Us <MdCallMissedOutgoing />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
