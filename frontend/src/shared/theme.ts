import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { progressCircleRecipe } from "@/shared/recipes/ProgressCircle.recipe";


const config = defineConfig({
  globalCss: {
    body: {
      bg: "bg.muted",
    },
  },
  theme: {
    slotRecipes: {
      progressCircle: progressCircleRecipe,
    },
  },
});

export default createSystem(defaultConfig, config)
