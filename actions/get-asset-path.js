const path = require("path");
const core = require("@actions/core");

const pkg = require("../package.json");
const forgePlatformsMapping = {
  "macOS-10.14": "darwin",
  "windows-2016": "win32",
  "ubuntu-18.04": "linux"
};

const os = process.env.__OS;
const platform = forgePlatformsMapping[os];
const assetName = `${pkg.productName}-${platform}-x64-${pkg.version}.zip`;
core.setOutput("asset_path", path.join("./out/make/zip", platform, "x64"));
core.setOutput("asset_name", assetName);
core.setOutput("version", process.env.tag_name.replace("refs/tags/", ""));
