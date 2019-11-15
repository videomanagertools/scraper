const { isDev } = require("./config/util");
module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "uScraper"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: "Dec-F",
          homepage: "https://github.com/videomanagertools/scraper"
        }
      }
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          maintainer: "Dec-F",
          homepage: "https://github.com/videomanagertools/scraper"
        }
      }
    }
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./config/webpack.main.config.js",
        renderer: {
          config: isDev()
            ? "./config/webpack.renderer.dev.config.js"
            : "./config/webpack.renderer.prod.config.js",
          entryPoints: [
            {
              html: "./src/renderer/index.html",
              js: "./src/renderer/index.tsx",
              name: "main_window"
            }
          ]
        }
      }
    ]
  ]
};
