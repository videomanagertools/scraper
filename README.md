[![Build Status](https://travis-ci.org/videomanagertools/scraper.svg?branch=master)](https://travis-ci.org/videomanagertools/scraper)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/videomanagertools/scraper/master)
![GitHub Release Date](https://img.shields.io/github/release-date/videomanagertools/scraper)

### 食用指南

下载对应平台的安装包，安装，打开。

#### 设置

1. 预设标签

可以预设标签用于编辑电影自定义标签

2. 场景

目前有普通和绅士（滑稽），对应了不懂的信息源。

设置场景后，会在【检索信息】按钮后显示可用的数据源，可根据需要切换

3. 代理

部分源可能需要使用代理访问，GTW 没屏蔽，但是不同运营商可能会屏蔽。没有代理的绅士们请自行解决。。

#### 建议

第一次使用请先拉出来一个测试用的文件夹，熟悉各个操作的效果后，再大批量操作。数据无价，谨慎操作

### 开发

```bash
git clone https://github.com/videomanagertools/scraper.git
cd scraper
npm i
npm run dev
```

如果这时候看到一个 Electron 应用已经跑起来了，说明成功了。

如果没有，想想办法解决

如果还是没解决，提 issues，贴上报错信息，可能会得到帮助

### 后续迭代

因为电影和剧集已经有很多成熟好用的工具，如果没特殊需求，没计划做这两个

已知计划是

1. 增加音乐信息爬取
2. 抽出来一个没有 GUI 的 CLI，可以在 NAS 的 docker 中定时跑
3. 可能会有一个整合的工具，把 Download，Scrape，Move Files 串联起来

### 最后

基本都是我自己平时没解决的痛点，如果刚好可以帮到你，绅士萌，star 后就尽情的享用吧。

Enjoy!
