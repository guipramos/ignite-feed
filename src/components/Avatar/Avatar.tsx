import React from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  hasBorder?: boolean;
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ hasBorder = true, src }) => {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt=""
    />
  );
};

export default Avatar;
