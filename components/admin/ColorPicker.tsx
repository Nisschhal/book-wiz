"use client";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}
const ColorPikcer = ({ value, onPickerChange }: Props) => {
  const [color, setColor] = useState("#aabbcc");
  const [isOpen, setIsOpen] = useState("false");

  return (
    <div className="relative flex flex-col gap-1 ">
      <div className="flex flex-row items-center w-[80px] border rounded-md p-1 ">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPikcer;
