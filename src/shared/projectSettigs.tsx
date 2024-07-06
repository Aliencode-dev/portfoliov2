import React, { useEffect, useState } from "react";
import { GetDarkestColor } from "./productFunctions";

export const GetStoreId = () => {
  // Fetch saved cookie
  const cookieStore = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cache_user="));
  const StoreId = cookieStore?.split("=")[1] || null;
  const Api = "https://flinoid.com";
  console.log("this is your cookie: ", StoreId);
  return [StoreId, Api];
};

export const Speedsize = (image: string, width: number) => {
  const wrappedImage = `https://sfycdn.speedsize.com/fbaf6506-81e1-43a2-bcc1-80e18c7b0146/${image}?v=1705058594&width=${width}`;
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
          console.log(result);
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
        console.log("Setting --brand to:", color.hex);
        console.log("Setting --brandRGB to:", rgbString);
        document.documentElement.style.setProperty("--brand", color.hex);
        document.documentElement.style.setProperty("--brandRGB", rgbString);
        document.documentElement.style.setProperty("--logo", logo);

        onFinishLoading(); // Signal that loading is finished
      });
    }
  }, [imageUrl, onFinishLoading]);

  return null;
};
