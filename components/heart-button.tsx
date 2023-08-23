import React, { useState } from "react";
import { HeartFill } from "./heart-fill";
import { HeartStroke } from "./heart-stroke";

export interface HeartButtonProps {
  numberOfHearts: number;
  initialPressed: boolean,
  onPressedChange: (pressed: boolean) => void;
  disable: boolean;
}

export const HeartButton = (props: HeartButtonProps) => {
  const { numberOfHearts, initialPressed, onPressedChange, disable } = props;
  const [pressed, setPressed] = useState(initialPressed);

  const onButtonClick = () => {
    if (disable) {
      return;
    }
  
    setPressed(!pressed);
    onPressedChange(!pressed);
  }

  return (
    <div onClick={onButtonClick} className="pb-5 w-[30px]">
      <p className="text-xs text-center mb-1 select-none">{ numberOfHearts }</p>
      {
        pressed
          ? <HeartFill />
          : <HeartStroke />  
      }
    </div>
  );
}
