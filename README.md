[![Build Status](https://travis-ci.org/videomanagertools/scraper.svg?branch=master)](https://travis-ci.org/videomanagertools/scraper)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/videomanagertools/scraper/master)
![GitHub Release Date](https://img.shields.io/github/release-date/videomanagertools/scraper)

操作动图
![gifhome_640x363_30s (1)](https://user-images.githubusercontent.com/20250430/65373590-3dc32780-dcb2-11e9-87a1-b946beb26996.gif)

检索信息截图
![3](https://upload-images.jianshu.io/upload_images/19638980-6899616ee80e89fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在多媒体服务中显示的截图
![1](https://upload-images.jianshu.io/upload_images/19638980-0272cb35f1bad544.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 绅士版食用指南

建议使用 dev 模式，因为 build 包我们测试，可能会有问题

#### dependencies

    - node 环境

#### 食用

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

其他的：

1. 目前只支持步兵
2. 信息源目前只支持 javbus，不支持切换

（后面有时间和需求就加骑兵和数据源）

已知计划是

1. 增加音乐信息爬取
2. 抽出来一个没有 GUI 的工具，可以在 NAS 的 docker 中定时跑
3. 可能会有一个整合的工具，把 Download，Scrape，Move Files 串联起来

### 最后

基本都是我自己平时没解决的痛点，如果刚好可以帮到你，绅士萌，star 后就尽情的享用吧。

Enjoy!
