import React, { useEffect, useRef, useState, MouseEvent } from "react";
import styles from "./header.module.css";
import { RiShareFill } from "react-icons/ri";
import { IoLink } from "react-icons/io5";
import { MdOutlineDownload } from "react-icons/md";
import { SharePage } from "../shared/productFunctions";
import Footer from "./footer";
import { Speedsize, GetStoreId } from "../shared/projectSettigs";
import {
  LoadingImageSquare,
  LoadingImageSquareSm,
} from "../shared/projectCards";

interface StoreDataProps {
  S_Name: string;
  S_Descr: string;
  Logo: string;
  F_ID: number;
  Phone: string;
  Location: string;
}

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

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLDivElement | null>(null);
  const [storeId, Api] = GetStoreId();
  const [storeData, setStoreData] = useState<StoreDataProps | null>(null);
  const [links, setLinks] = useState<LinkItemProps[]>([]);

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

  //Fetch Links
  useEffect(() => {
    if (storeId) {
      const fetchUserLinks = async () => {
        try {
          const response = await fetch(
            `${Api}/api/projects?storeId=${storeId}`
          );
          const result: LinkItemProps[] = await response.json();
          console.log(result);
          setLinks(result);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserLinks();
    }
  }, [storeId]);

  const handleShare = () => {
    storeData &&
      SharePage(storeData.S_Name, storeData.S_Descr, window.location.href);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent<Document>) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        closeBtnRef.current &&
        !closeBtnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside as any);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, [navRef]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full flex max-w-[1040px] flex-col items-center md:px-[20px] z-[1]">
      <header
        className={`h-[60px] md:max-w-[calc(100%-40px)] lg:px-[16px] w-full fixed flex flex-col items-center justify-center ${
          visible ? " bg-white bg-opacity-85 rounded-lg md:top-3" : ""
        }`}
      >
        {visible && (
          <div className="backdrop-blur-sm h-full w-full lg:rounded-lg absolute z-0"></div>
        )}
        <div className="h-full py-4 px-5 w-full flex flex-row items-center z-[1] relative">
          <div className="w-full relative h-full justify-start flex flex-row">
            {storeData?.Logo ? (
              <img
                src={Speedsize(
                  `${Api}/ireserve/dashboard/images/${storeData.Logo}`,
                  1800
                )}
                alt={`${storeData.S_Name} Logo`}
                className={`ease-in-out transform transition-all duration-1000 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
                sizes="100vw auto"
                style={{
                  objectFit: "contain",
                  objectPosition: "left",
                }}
              />
            ) : visible ? (
              <LoadingImageSquareSm />
            ) : (
              ""
            )}
          </div>
          <div className="w-full h-full flex flex-row justify-end">
            <div
              ref={closeBtnRef}
              className={`${styles.menuButton}`}
              onClick={toggleNav}
            >
              <div
                className={`${styles.line} rounded-2xl bg-gray-900 ${
                  isOpen ? styles.line1Open : ""
                }`}
              ></div>
              <div
                className={`${styles.line} rounded-2xl bg-gray-900 ${
                  isOpen ? styles.line2Open : ""
                }`}
              ></div>
            </div>
          </div>

          <div
            ref={navRef}
            className={`${
              styles.sidebar
            } z-[1] backdrop-blur-sm bg-white bg-opacity-85 p-[20px] md:p-[24px] ${
              isOpen ? styles.sidebarOpen : ""
            }`}
          >
            <div className="h-[30px] w-full flex flex-row items-start justify-between mb-[16px]">
              {storeData ? (
                <img
                  src={Speedsize(
                    `${Api}/ireserve/dashboard/images/${storeData.Logo}`,
                    1800
                  )}
                  alt={`${storeData.S_Name} small Logo`}
                  width={30}
                  height={30}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              ) : visible ? (
                <LoadingImageSquareSm />
              ) : (
                ""
              )}
            </div>
            <hr />
            {links && (
              <ul>
                {links.map((link) => (
                  <li key={link.ID}>
                    <a
                      href={link.L_Link}
                      className="flex items-center flex-row justify-between px-2 py-1 text-gray-900 rounded hover:bg-gray-100 md:border-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.L_Name}{" "}
                      {link.L_Name.toLowerCase().includes("download") ? (
                        <>
                          <MdOutlineDownload />
                        </>
                      ) : (
                        <>
                          <IoLink />
                        </>
                      )}
                    </a>
                  </li>
                ))}
                <li className="flex items-center flex-row justify-between px-2 py-1 text-gray-900 rounded hover:bg-gray-100 md:border-0">
                  <button
                    className="w-full text-start"
                    onClick={handleShare}
                    type="button"
                  >
                    Share page with friends
                  </button>
                  <RiShareFill />
                </li>
              </ul>
            )}
            <div className="absolute bottom-[20px] flex flex-col items-center justify-center w-full">
              <Footer />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
