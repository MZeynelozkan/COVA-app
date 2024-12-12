import Script from "next/script";
import React from "react";

type Props = {
  pId: string;
};

const AdSense = ({ pId }: Props) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default AdSense;
