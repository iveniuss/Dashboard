import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  globalCss:{
    body: {
      bg: "bg.muted"
    }
  }
})

export default createSystem(defaultConfig, config)