import React, { useState } from "react";
import { HeartFill } from "./heart-fill";
import { HeartStroke } from "./heart-stroke";

export interface HeartButtonProps {
  initialPressed: boolean,
  onPressedChange: (pressed: boolean) => void;
}

export const HeartButton = (props: HeartButtonProps) => {
  const { initialPressed, onPressedChange } = props;
  const [pressed, setPressed] = useState(initialPressed);

  const onButtonClick = () => {
    setPressed(!pressed);
    onPressedChange(!pressed);
  }

  return (
    <div onClick={onButtonClick} style={{ width: '30px' }}>
      {
        pressed
          ? <HeartFill />
          : <HeartStroke />  
      }
    </div>
  );
}
