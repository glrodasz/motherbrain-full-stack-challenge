import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "antd";

import getRandomInteger from "../../../utils/getRandomInteger";

const genericLogos = [
  "/logos/red.svg",
  "/logos/blue.svg",
  "/logos/violet.svg",
  "/logos/yellow.svg",
];

const Logo = ({ src }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.onload = function () {
      setImageUrl(src);
    };
    image.onerror = function () {
      setImageUrl(genericLogos[getRandomInteger(genericLogos.length)]);
    };

    image.src = src;
  }, [src]);

  if (!imageUrl) {
    return <Skeleton.Image />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 90,
        backgroundColor: "#FFF",
        padding: 15,
        border: "1px solid rgba(243, 244, 246, 1)",
        boxShadow:
          "0 0 transparent, 0 0 transparent, 0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)",
      }}
    >
      <img
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        src={imageUrl}
      ></img>
    </div>
  );
};

Logo.propTypes = {
  src: PropTypes.string,
};

Logo.defaultProps = {
  src: "",
};

export default Logo;
