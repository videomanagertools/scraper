export type Actor = {
  /**
   * 名字
   */
  name: string;
  /**
   * 角色
   */
  role?: string;
  /**
   * 排序
   */
  order?: string;
  /**
   * 图片
   */
  thumb?: string;
};
export type Uniqueid = {
  /** 加入到标签属性中的key */
  _attr: {
    /**
     * 平台
     */
    type: string;
    default?: boolean;
  };
  /**
   * 标签的值
   */
  _value: string;
};
export interface ModelType {
  /**
   * ID,可多个平台多个ID
   */
  uniqueid?: Uniqueid | Uniqueid[];
  /**
   * 标题
   */
  title?: string;
  /**
   * 短标题
   */
  originaltitle?: string;
  /**
   * 年份
   */
  premiered?: string;
  /**
   * 年份，推荐使用premiered，这个是为了兼容
   */
  year?: string;
  /** movie slogan */
  tagline?: string;
  /**
   * 电影时长，只支持分钟
   */
  runtime?: number;
  /**
   * MPAA电影分级
   */
  mpaa?: string;
  /**
   * 类型
   */
  genre?: string[];
  /**
   * 制作商
   */
  studio?: string;
  /** 标签 */
  tag?: string;
  /**
   * art
   */
  art?: {
    /**
     * 海报
     */
    poster?: string;
    /**
     * 同人画
     */
    fanart?: string;
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
