import type { Meta, StoryObj } from "@storybook/react";

import SwatchCard from "./SwatchCard";
import chroma from "chroma-js";

type SwatchCardAndCustomArgs = React.ComponentProps<typeof SwatchCard> & {
  rawColor: string;
};

const meta = {
  component: SwatchCard,
  title: "Components/Swatch Card",
  tags: ["autodocs"],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  argTypes: {
    rawColor: {
      control: {
        type: "color",
      },
    },
    color: {
      table: { disable: true },
    },
  },
  render: ({ rawColor, ...props }) => (
    <SwatchCard {...props} color={chroma(rawColor)} />
  ),
} satisfies Meta<SwatchCardAndCustomArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rawColor: "#ff0000",
    color: chroma("#ff0000"),
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
