declare interface Dialog {}

declare type DialogOptions = {
  /**
   * 是否在弹窗显示前关闭其他弹窗
   *
   * boolean 类型，表示是否关闭所有显示的弹窗
   *
   * array 类型，表示需要关闭的弹窗
   * @default false
   */
  closed?: boolean | Array<string>;
  /**
   * 是否在弹窗关闭后销毁实例
   * @default true
   */
  destroyed?: boolean;
  /**
   * 是否将弹窗挂载到 body 元素上，设为false则挂载到 App 实例上
   * @default true
   */
  appendToBody?: boolean;
};

declare interface DialogInstance {
    /**
     * 弹窗ID
     */
    id: string
    /**
     * 弹窗所属类型
     */
    type: Dialog['type']
    /**
     * 弹窗是否已打开
     */
    opened: import('vue').Ref<boolean>
    /**
     * 弹窗插入的位置
     */
    appendToBody: boolean
    /**
     * 弹窗实例
     */
    app?: import('vue').App
    /**
     * 弹窗组件的props
     */
    props?: object
}
