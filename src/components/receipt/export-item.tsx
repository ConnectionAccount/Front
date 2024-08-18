import React, { useEffect } from "react";
import { exportItemApi } from "@/apis";

export default function Clearance({ data }: any) {
  const [iframeSrc, setIframeSrc] = React.useState("");

  useEffect(() => {
    const getSrc = async () => {
      try {
        const res = await exportItemApi.actpdf(data);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await res.blob();
        const urlObject = URL.createObjectURL(blob);

        setIframeSrc(urlObject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getSrc();
  }, [data]);

  return (
    <>
      <iframe
        src={iframeSrc}
        title="Receipt"
        style={{ width: "100%", border: "none", height: "600px" }}
        allow="fullscreen"
      />
    </>
  );
}
