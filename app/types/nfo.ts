export type Actor = {
  /**
   * 名字
   */
  name: { _text: string };
  /**
   * 角色
   */
  role?: { _text: string };
  /**
   * 排序
   */
  order?: { _text: string };
  /**
   * 图片
   */
  thumb?: { _text: string };
};
export type Uniqueid = {
  /** 加入到标签属性中的key */
  _attributes: {
    /**
     * 平台
     */
    type: string;
    default?: boolean;
  };
  /**
   * 标签的值
   */
  _text: string;
};
export interface NFOModel {
  /**
   * ID,可多个平台多个ID
   */
  uniqueid?: Uniqueid[];
  /**
   * 标题
   */
  title?: { _text: string };
  /**
   * 短标题
   */
  originaltitle?: { _text: string };
  /**
   * 年份
   */
  premiered?: { _text: string };
  /**
   * 年份，推荐使用premiered，这个是为了兼容
   */
  year?: { _text: string };
  /** movie slogan */
  tagline?: { _text: string };
  /**
   * 电影时长，只支持分钟
   */
  runtime?: { _text: number };
  /**
   * MPAA电影分级
   */
  mpaa?: { _text: string };
  /**
   * 类型
   */
  genre?: { _text: string }[];
  /**
   * 制作商
   */
  studio?: { _text: string };
  /** 标签 */
  tag?: { _text: string }[];
  /**
   * art
   */
  art?: {
    /**
     * 海报
     */
    poster?: { _text: string };
    /**
     * 同人画
     */
    fanart?: { _text: string };
  };
  /**
   * actor
   */
  actor?: Actor | Actor[];
  /**
   * 文件信息
   */
  fileinfo?: {
    /**
     * 流信息
     */
    streamdetails?: {
      /**
       * 视频流信息
       */
      video: {
        /**
         * 编解码器
         */
        codec: string;
        /**
         * 宽高比
         */
        aspect: string;
        /**
         * 宽度
         */
        width: number;
        /**
         * 高度
         */
        height: number;
        /**
         * 时长：秒
         */
        durationinseconds: number;
      };
      /**
       * 音频流信息
       */
      audio: {
        /**
         * 编解码器
         */
        codec: string;
        /**
         * 语言
         */
        language: string;
        /**
         * 声道数（1-8）
         */
        channels: number;
      };
    };
  };
  dateadded?: string;
}
