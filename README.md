![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/videomanagertools/scraper/master)
![GitHub Release Date](https://img.shields.io/github/release-date/videomanagertools/scraper)
[![Gitter](https://badges.gitter.im/videomanagertools/uScraper.svg)](https://gitter.im/videomanagertools/uScraper?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
![GitHub All Releases](https://img.shields.io/github/downloads/videomanagertools/scraper/total)

![WorkFlow](https://img.shields.io/github/workflow/status/videomanagertools/scraper/package?color=orange&label=actions&logo=github&logoColor=orange&style=for-the-badge)

## 注意

这个是媒体元数据管理，推荐和 Jellyfin 配合使用。其他平台尽量兼容。

虽然有绅士模式，但是作者不推荐使用。

### 食用指南

下载对应平台的安装包，安装，打开。

#### 设置



1. 预设标签

可以预设标签用于编辑电影自定义标签

2. 场景

目前有普通和绅士（滑稽），对应了不同的信息源。

设置场景后，会在【检索信息】按钮后显示可用的数据源，可根据需要切换

3. 代理

部分源可能需要使用代理访问，GTW 没屏蔽，但是不同运营商可能会屏蔽。没有代理的绅士们请自行解决。。

4. 帧截图

为了方便快速的浏览视频内容，提供了这个功能。依赖 ffmpeg，使用前请确保环境变量可用

#### 建议

第一次使用请先拉出来一个测试用的文件夹，熟悉各个操作的效果后，再大批量操作。数据无价，谨慎操作

### 开发

```bash
git clone https://github.com/videomanagertools/scraper.git
cd scraper
npm i
npm run dev
```

如果这时候看到一个 Electron 应用已经跑起来了。

如果没有，想想办法解决

如果还是没解决，提 issues，贴上报错信息，可能会得到帮助

### 后续迭代

因为电影和剧集已经有很多成熟好用的工具，如果没特殊需求，没计划做这两个

已知计划是

1. 增加音乐信息爬取
2. 抽出来一个没有 GUI 的 CLI，可以在 NAS 的 docker 中定时跑
3. 可能会有一个整合的工具，把 Download，Scrape，Move Files 串联起来

### 交流

[Gitter](https://gitter.im/videomanagertools/uScraper?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

### 最后

基本都是我自己平时没解决的痛点，如果刚好可以帮到你，绅士萌，star 后就尽情的享用吧。

Enjoy!
