import { useState, useCallback } from "react";
import { useBBox } from "@/utils/useBBox";

const degToRad = Math.PI / 180;

function hsToPositionPolar(hue: number, sat: number) {
  const hueRad = (hue - 90) * degToRad;

  const x = ((Math.cos(hueRad) * sat) - 1) * -0.5;
  const y = ((Math.sin(hueRad) * sat) - 1) * -0.5;

  return [x, y];
}

function positionPolarToHS(x: number, y: number) {
  const xBi = (x * -2) + 1;
  const yBi = (y * -2) + 1;

  const hue = (Math.atan2(yBi, xBi) / degToRad) + 90;
  const sat = Math.min(Math.sqrt((yBi * yBi) + (xBi * xBi)), 1)

  return [hue, sat];
}

export default function ColorPicker() {
  const { ref: radarRef, bBox, handleResize } = useBBox<HTMLDivElement>();
  const [hue, setHue] = useState(0.0);
  const [sat, setSat] = useState(0.0);
  const [x, y] = hsToPositionPolar(hue, sat);
  const left = x * bBox.width;
  const top = y * bBox.height;

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (radarRef.current) {
      const x = (event.clientX - bBox.x) / bBox.width;
      const y = (event.clientY - bBox.y) / bBox.height;

      const [hue, sat] = positionPolarToHS(x, y);
      setHue(hue);
      setSat(sat);
    }
    event.preventDefault();
  }, [bBox, radarRef]);

  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    handleMouseMove(event.nativeEvent);
    handleResize();
  }, [handleMouseMove, handleMouseUp, handleResize]);

  return (
    <div className="p-4 pt-2 bg-neutral-200 rounded-md shadow-lg flex flex-col items-center space-y-2 w-48">
      <div className="text-neutral-500">
        Color Picker
      </div>
      <div className="rounded-full w-full aspect-square inset-shadow-sm inset-shadow-black/15 hue-radar cursor-pointer" onMouseDown={handleMouseDown} ref={radarRef}>
        <div className="relative w-0 h-0" style={{ left, top }}>
          <div style={{ backgroundColor: `hsl(${hue}deg ${sat * 100}% 50%)` }} className="relative -top-2.5 -left-2.5 size-5 aspect-square rounded-full border-neutral-100 border-4 outline-neutral-400 outline-1 hover:outline-4 hover:outline-neutral-400/50">
          </div>
        </div>
      </div>
    </div>
  )
}
