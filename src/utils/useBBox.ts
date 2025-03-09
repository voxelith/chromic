// source: https://codesandbox.io/p/sandbox/usebBox-hook-1y5t7
// source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import { useLayoutEffect, useCallback, useState, useRef } from "react";

type BBoxResult = {
  x: number;
  y: number;
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

function getBBox<T extends HTMLElement>(element?: T): BBoxResult {
  let bBox: BBoxResult = {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };
  if (element) bBox = element.getBoundingClientRect();
  return bBox;
}

export function useBBox<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [bBox, setBBox] = useState<BBoxResult>(getBBox());

  const handleResize = useCallback(() => {
    if (!ref.current) return;
    setBBox(getBBox(ref.current)); // Update client bBox
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    handleResize();

    if (typeof ResizeObserver === "function") {
      let resizeObserver: ResizeObserver | null = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);
      return () => {
        if (!resizeObserver) return;
        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } else {
      window.addEventListener("resize", handleResize); // Browser support, remove freely
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize, ref]);

  return { ref, bBox, handleResize };
}
