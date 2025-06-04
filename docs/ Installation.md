1. Install Tailwind CSS
   Install tailwindcss and @tailwindcss/vite via npm.
   `npm install tailwindcss @tailwindcss/vite`

2. Configure the Vite plugin

Add the @tailwindcss/vite plugin to your Vite configuration.

vite.config.ts:

```
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

3. Import Tailwind CSS

Add an @import to your CSS file that imports Tailwind CSS.
index.css:
`@import "tailwindcss";`

4. Start your build process

Run your build process with npm run dev or whatever command is configured in your package.json file.

`npm run dev`
