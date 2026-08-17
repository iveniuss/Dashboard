import { defineSlotRecipe } from "@chakra-ui/react";

export const progressCircleRecipe = defineSlotRecipe({
  slots: ["root", "circle", "track", "range", "valueText", "label"],
  variants: {
    size: {
      "2xl": {
        circle: { "--size": "7rem", "--thickness": "0.75rem" },
      },
    },
  },
});
