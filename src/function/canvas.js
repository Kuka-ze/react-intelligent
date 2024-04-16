/** `cavans`位置类型 */
interface CavansPosition {
  /** 距离顶部偏移值 */
  top?: number
  /** 距离底部偏移值，会覆盖`top` */
  bottom?: number
  /** 距离左边偏移值 */
  left?: number
  /** 距离右边偏移值，会覆盖`left` */
  right?: number
  /** 位置层级，与`css`行为一致 */
  zIndex?: number
}

/** `cavans`矩阵尺寸类型 */
interface CavansRect {
  /** 生成的图片宽度 */
  width: number
  /** 生成的图片高度 */
  height: number
  /**
   * 边框圆角
   * - 当`width === height`，`borderRadius = width / 2`或者`borderRadius = height / 2`就会变成一个圆形
   */
  borderRadius?: number
  /** 边框厚度 */
  borderWidth?: number
  /** 边框颜色 */
  borderColor?: string
}

interface CavansImg extends CavansPosition, Omit<CavansRect, "borderWidth" | "borderColor"> {
  type: "img"
  /**
   * 生成图片的路径
   * 
   * - 网络图片地址，前提是这个图片可以跨域请求，微信小程序端需要配置`request`域名白名单
   * - （仅限H5端生效）本地相对路径地址
   * - （仅限H5端生效）`base64`图片编码，例如：`data:image/jpge;base64,xxxxxxxx`
   */
  src: string
}

interface CavansBox extends CavansRect, CavansPosition {
  type: "box"
  /** 容器背景颜色 */
  backgroundColor: string
}

interface CavansText extends CavansPosition {
  type: "text"
  /** 文字内容 */
  text: string
  /** 字体大小 */
  fontSize: number
  /** 字体颜色 */
  color: string
  // /** 指定字体的宽度，超过会被挤压 */
  // width?: number
  // /** 与`css`的`font-family`行为一致 */
  // fontFamily?: string
  /**
   * 与`css`的`text-align`行为一致
   * [参考](https://uniapp.dcloud.io/api/canvas/CanvasContext?id=canvascontextsettextalign)
   * - 默认`"left"`
   */
  textAlign?: "left" | "center" | "right"
  /**
   * 用于设置文字的水平对齐
   * [参考](https://uniapp.dcloud.io/api/canvas/CanvasContext?id=canvascontextsettextbaseline)
   * - 默认：`normal`
   */
  textBaseline?:  "top" | "bottom" | "middle" | "normal"
}

interface CavansFail {
  /** 错误信息 */
  errMsg: string
  /**
   * 错误类型
   * - `export`: canvas导出图片路径错误
   * - `load`: 图片加载失败错误
   */
  type: "export" | "load"
  /** 图片加载失败时携带的对象 */
  info?: CavansImg
}

interface CavansCreaterParams {
  /**
   * `cavans`节点`id`
   * @example
   * ```html
   * <cavans id="xxx" canvas-id="xxx"></cavans>
   * ```
  */
  cavansId: string
  /** `cavans`整体宽度 */
  width: number
  /** `cavans`整体高度 */
  height: number
  /** 生成的内容列表 */
  list: Array<CavansImg | CavansBox | CavansText>
  /**
   * 生成的图片类型
   * - 默认`"png"`
   */
  fileType?: "jpg" | "png"
  /** 成功回调 */
  success?: (res: UniApp.CanvasToTempFilePathRes) => void
  /** 图片加载失败回调 */
  fail?: (error: CavansFail) => void
}

