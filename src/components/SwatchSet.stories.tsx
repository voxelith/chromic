import type { Meta, StoryObj } from "@storybook/react";

import SwatchSet from "./SwatchSet";
import chroma from "chroma-js";

type SwatchSetAndCustomArgs = React.ComponentProps<typeof SwatchSet> & {
  rawColors: string[];
};

const meta = {
  component: SwatchSet,
  title: "Components/Swatch Set",
  tags: ["autodocs"],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  argTypes: {
    rawColors: {
      control: {
        type: "object",
      },
    },
    colors: {
      table: { disable: true },
    },
  },
  render: ({ rawColors, ...props }) => (
    <SwatchSet
      {...props}
      colors={rawColors.map((rawColor) => chroma(rawColor))}
    />
  ),
} satisfies Meta<SwatchSetAndCustomArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rawColors: ["#ff0000", "#00ff00", "#0000ff"],
    colors: [],
    variant: "vertical",
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    variant: "vertical",
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    variant: "horizontal",
  },
};
