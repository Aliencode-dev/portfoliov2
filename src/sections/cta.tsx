import { useState, useEffect } from "react";
import { IoLink } from "react-icons/io5";
import { MdOutlineDownload } from "react-icons/md";
import CtaButton from "../assets/ctabutton";
import { GetStoreId } from "../shared/projectSettigs";

interface LinkItemProps {
  L_Name: string;
  L_Cost: string;
  L_Descr: string;
  L_Image: string;
  L_Images: string[]; // Assuming it's an array of strings
  L_Size:
    | {
        size: string;
        category: string;
      }
    | string; // to handle the case where it's a string
  L_Link: string;
  S_ID: string;
  F_ID: string;
  ID: number;
  Visible: number;
  Order_l: number;
  Analytics: any[]; // Assuming it's an array of any type, adjust as needed
}

const Cta = () => {
  const [links, setLinks] = useState<LinkItemProps[]>([]);
  const [storeId, Api] = GetStoreId();

  //Fetch Links
  useEffect(() => {
    if (storeId) {
      const fetchUserLinks = async () => {
        try {
          const response = await fetch(
            `${Api}/api/projects?storeId=${storeId}`
          );
          const result: LinkItemProps[] = await response.json();
          setLinks(result);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserLinks();
    }
  }, [storeId]);

  return (
    <>
      {links && links.length > 0 && (
        <div className="flex flex-col items-start py-[20px] px-[10px] gap-[16px] w-full">
          {links.map((link) => (
            <CtaButton key={link.ID} name={link.L_Name} href={link.L_Link}>
              {link.L_Name.toLowerCase().includes("download") ? (
                <MdOutlineDownload />
              ) : (
                <IoLink />
              )}
            </CtaButton>
          ))}
        </div>
      )}
    </>
  );
};

export default Cta;
