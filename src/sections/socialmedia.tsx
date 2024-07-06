import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { GetStoreId } from "../shared/projectSettigs";

interface SocialMediaProps {
  Facebook: string;
  Instagram: string;
  Twitter: string;
  Linkedin: string;
}

const SocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState<SocialMediaProps | null>(null);
  const [storeId, Api] = GetStoreId();

  useEffect(() => {
    const fetchSocialMedia = async () => {
      const response = await fetch(`${Api}/api/socialMedia?storeId=${storeId}`);
      const result = await response.json();
      setSocialMedia(result[0]);
      console.log("Social Media: ", result[0]);
    };
    fetchSocialMedia();
  }, [storeId]);
  return (
    <div className="flex flex-row gap-3 text-[20px] md:text-[24px]">
      {socialMedia && (
        <>
          {socialMedia.Facebook && (
            <a
              href={`https://facebook.com/${socialMedia.Facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 hover:bg-[var(--brand)] bg-white hover:text-white text-[var(--brand)]"
            >
              <FaFacebookF />
            </a>
          )}
          {socialMedia.Twitter && (
            <a
              href={`https://x.com/${socialMedia.Twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 hover:bg-[var(--brand)] bg-white hover:text-white text-[var(--brand)]"
            >
              <FaTwitter />
            </a>
          )}
          {socialMedia.Instagram && (
            <a
              href={`https://instagram.com/${socialMedia.Instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 hover:bg-[var(--brand)] bg-white hover:text-white text-[var(--brand)]"
            >
              <FaInstagram />
            </a>
          )}
          {socialMedia.Linkedin && (
            <a
              href={`https://linkdin.com/${socialMedia.Linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 hover:bg-[var(--brand)] bg-white hover:text-white text-[var(--brand)]"
            >
              <FaLinkedinIn />
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default SocialMedia;
