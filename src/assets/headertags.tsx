import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { GetStoreId } from "../shared/projectSettigs";

interface HeaderTagsData {
  header: string;
  fbheader: string;
  gtheader: string;
}

const HeaderTags: React.FC = () => {
  const [storeId, Api] = GetStoreId();
  const [headTags, setHeadTags] = useState<HeaderTagsData | null>(null);

  useEffect(() => {
    if (storeId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${Api}/api/headerTags?storeId=${storeId}`
          );
          const result = await response.json();
          console.log(result[0]);
          setHeadTags(result[0]);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [storeId]);

  return (
    <Helmet>
      {headTags && (
        <>
          {headTags.header && (
            <div dangerouslySetInnerHTML={{ __html: headTags.header }} />
          )}
          {headTags.fbheader && (
            <div dangerouslySetInnerHTML={{ __html: headTags.fbheader }} />
          )}
          {headTags.gtheader && (
            <div dangerouslySetInnerHTML={{ __html: headTags.gtheader }} />
          )}
        </>
      )}
    </Helmet>
  );
};

export default HeaderTags;
