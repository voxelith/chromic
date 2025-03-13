import { Color } from "chroma-js";
import SwatchCard from "./SwatchCard";

export interface SwatchSetProps {
  variant: "vertical" | "horizontal";
  colors: Color[];
}

export default function SwatchSet({ variant, colors }: SwatchSetProps) {
  return (
    <div
      data-variant={variant}
      className="flex data-[variant=vertical]:flex-row data-[variant=horizontal]:flex-col"
    >
      {colors.map((color, index) => (
        <SwatchCard color={color} variant={variant} key={index} />
      ))}
    </div>
  );
}
