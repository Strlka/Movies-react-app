import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'


const config = defineConfig({
    theme: {
      tokens: {
        colors: {
          brandBlue: {
            DEFAULT: { value: 'rgb(34 39 216)' },
            200: { value: 'rgb(10 11 59)' },
            400: { value: 'rgb(94 96 212)' },
          }
        }
      },
      recipes: {
        button: {}
      }
    }
  })

export const system = createSystem(defaultConfig, config)



