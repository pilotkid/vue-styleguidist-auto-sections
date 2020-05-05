![Node.js Package](https://github.com/pilotkid/vue-styleguidist-auto-sections/workflows/Node.js%20Package/badge.svg)
# Installation
1. From the terminal run: `npm install vue-styleguidist-auto-sections --save-dev`
2. In your project (must have vue-style-guidist installed) open your `styleguide.config.js`
3. Add a requirement `let DirSections = require('vue-styleguidist-auto-sections');`
4. In the `module.exports` for vue-styleguidist add `sections: DirSections.getSections()`

**Example styleguide.config.js**
```
let DirSections = require('vue-styleguidist-auto-sections');

module.exports = {
    sections: DirSections.getSections(),
}
```

# Options

**BasePath**  
- Description
  * The root directory you wish to search for components and folders
- Type
  * string
- Default 
  * `'./src/components/'`
- Example Usage
  * `DirSections.BasePath = './src/components/NewDir'`

**BaseSectionTitle**  
- Description
  * The name for the section that correlates to the `BasePath`
- Type
  * string
- Default 
  * `'Miscellaneous'`
- Example Usage
  * `DirSections.BaseSectionTitle = 'Uncategorized'`

**ComponentsRegex**  
- Description
  * The regular expression to be used to locate your components
- Type
  * string
- Default 
  * `'[A-Z]*.vue'`
- Example Usage
  * `DirSections.ComponentsRegex = '*.vue'`

**Verbose**  
- Description
  * Will it output verbose information as it scans directories
- Type
  * boolean
- Default 
  * `false`
- Example Usage
  * `DirSections.Verbose = true`
