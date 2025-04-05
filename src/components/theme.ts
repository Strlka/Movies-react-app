import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    cssVarsRoot: ":where(:root, :host)",
  })
  
  export default createSystem(defaultConfig, config)