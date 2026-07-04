"use client";

import { Toaster } from "react-hot-toast";

function ToasterProvider() {
  return (
    <Toaster
    // position="top-center"
    // gutter={12}
    // containerStyle={{ margin: "8px" }}
    // toastOptions={{
    //   success: {
    //     duration: 2000,
    //   },
    //   error: {
    //     duration: 4000,
    //   },
    //   style: {
    //     fontSize: "16px",
    //     maxWidth: "500px",
    //     padding: "14px 24px",
    //     backgroundColor: "#201f24",
    //     color: "white",
    //   },
    // }}
    />
  );
}

export default ToasterProvider;
