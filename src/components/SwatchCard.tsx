import { Button, ButtonProps } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  DocumentDuplicateIcon,
  LockOpenIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Color } from "chroma-js";

export interface SwatchCardProps {
  variant?: "vertical" | "horizontal";
  color: Color;
}

function SwatchCardButton({ ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className="p-2 opacity-0 rounded-md hover:opacity-100 group-hover:opacity-30 cursor-pointer text-white group-data-[invert=true]:text-black bg-white/15 group-data-[invert=true]:bg-black/15"
    />
  );
}

/** The core component for quick-generating a base color set. */
export default function SwatchCard({
  color,
  variant = "vertical",
}: SwatchCardProps) {
  return (
    <div
      data-variant={variant}
      data-invert={color.luminance() > 0.17}
      className="flex items-center justify-center gap-6 data-[variant=vertical]:flex-col data-[variant=horizontal]:flex-row data-[variant=vertical]:px-8 data-[variant=horizontal]:py-8 p-12 group"
      style={{ backgroundColor: color.hex() }}
    >
      <SwatchCardButton>
        <AdjustmentsHorizontalIcon className="size-7" />
      </SwatchCardButton>
      <SwatchCardButton>
        <DocumentDuplicateIcon className="size-7" />
      </SwatchCardButton>
      <SwatchCardButton>
        <LockOpenIcon className="size-7" />
      </SwatchCardButton>
      <SwatchCardButton>
        <TrashIcon className="size-7" />
      </SwatchCardButton>
    </div>
  );
}
