import React, { useEffect, useState } from "react";
import { GetDarkestColor } from "./productFunctions";
import Cookies from "js-cookie";

export const GetStoreId = () => {
  // Fetch saved cookie
  let StoreId = null;
  const cookieValue = Cookies.get("cache_id");

  if (cookieValue) {
    try {
      const decodedData = JSON.parse(decodeURIComponent(cookieValue));
      StoreId = decodedData.id;
    } catch (error) {
      console.error("Error parsing cookie data:", error);
    }
  }

  const Api = import.meta.env.VITE_REACT_APP_API_URL;
  return [StoreId, Api];
};

export const Speedsize = (image: string, width: number) => {
  const wrappedImage = `https://your_speedsizelink/${image}?v=1705058594&width=${width}`;
  return wrappedImage;
};

interface ProjectSettingsProps {
  onFinishLoading: () => void; // Callback function to signal loading finished
}

export const Projectsettings: React.FC<ProjectSettingsProps> = ({
  onFinishLoading,
}) => {
  const [imageUrl, setImageUrl] = useState<string | "">("");
  const [storeId, api] = GetStoreId();

  useEffect(() => {
    if (storeId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${api}/api/userLogo?storeId=${storeId}`
          );
          const result = await response.json();
          setImageUrl(
            Speedsize(
              `${api}/ireserve/dashboard/images/${result.logoUrl}`,
              1800
            )
          );
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [storeId]);

  useEffect(() => {
    if (imageUrl) {
      GetDarkestColor(imageUrl).then((color) => {
        const rgbString = `${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]}`;
        const logo = `url(${imageUrl})`;
        document.documentElement.style.setProperty("--brand", color.hex);
        document.documentElement.style.setProperty("--brandRGB", rgbString);
        document.documentElement.style.setProperty("--logo", logo);

        onFinishLoading(); // Signal that loading is finished
      });
    }
  }, [imageUrl, onFinishLoading]);

  return null;
};
