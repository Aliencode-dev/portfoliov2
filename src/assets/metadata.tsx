import React from "react";
import { Helmet } from "react-helmet";

type MetadataProps = {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  url: string;
  author: string;
};

const Metadata: React.FC<MetadataProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  author,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={author} />

      <link rel="icon" href={image} />
    </Helmet>
  );
};

export default Metadata;
