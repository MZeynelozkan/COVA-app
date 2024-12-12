"use client";
import Script from "next/script";
import React from "react";

const AdSense = () => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4289366483169589"
      crossOrigin="anonymous"
    />
  );
};

export default AdSense;
