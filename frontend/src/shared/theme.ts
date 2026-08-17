import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { progressCircleRecipe } from "@/shared/recipes/ProgressCircle.recipe";

const config = defineConfig({
  globalCss: {
    body: {
      bg: "bg.main"
    },
  },
  theme: {
    slotRecipes: {
      progressCircle: progressCircleRecipe,
    },
    semanticTokens: {
      colors: {
        bg: {
          main: {
            value: { base: "{white}", _dark:"{colors.gray.900}" },
          },
          card: {
            value: { base: "{colors.bg.muted}", _dark:"{colors.gray.800}" },
          },
        },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
