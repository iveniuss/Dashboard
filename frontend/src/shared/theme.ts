import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { progressCircleRecipe } from "@/shared/recipes/ProgressCircle.recipe";


const config = defineConfig({
  globalCss: {
    body: {
      bg: "bg.main",
    },
  },
  theme: {
    slotRecipes: {
      progressCircle: progressCircleRecipe,
    },
    semanticTokens:{
      colors:{
        "bg.main":{
          value:{
            base: "bg"
          }
        },
        "bg.card":{
          value:{
            base: "bg.subtle"
          }
        }
      }
    }
  },
});

export default createSystem(defaultConfig, config)
