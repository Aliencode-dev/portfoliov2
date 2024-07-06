import React from "react";
import { JsonLd } from "react-schemaorg";
import {
  Organization,
  WithContext,
  ContactPoint,
  PostalAddress,
} from "schema-dts";

interface StoreDataProps {
  S_Name: string;
  S_Descr: string;
  Logo: string;
  F_ID: number;
  Phone: string;
  Location: string;
}

const SchemaMarkup: React.FC<{ storeData: StoreDataProps | null }> = ({
  storeData,
}) => {
  const schemaData = storeData
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: storeData.S_Name,
        url: window.location.href,
        logo: storeData.Logo,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: storeData.Phone,
          contactType: "Customer Service",
        } as ContactPoint,
        address: {
          "@type": "PostalAddress",
          streetAddress: storeData.Location,
        } as PostalAddress,
      }
    : {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "FiveSeven Constructions",
        url: window.location.href,
        logo: "/fiveseven.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-800-555-5555",
          contactType: "Customer Service",
        } as ContactPoint,
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Main St",
        } as PostalAddress,
      };

  return (
    <JsonLd<Organization>
      item={{ ...schemaData } as WithContext<Organization>}
    />
  );
};

export default SchemaMarkup;
