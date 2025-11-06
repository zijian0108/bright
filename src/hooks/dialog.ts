import {
  createApp,
  h,
  ref,
  useId,
  watch,
} from "vue";

// 存储已注册的弹窗组件
const dialogs = new Map<Dialog["type"], any>();
// 存储已创建的弹窗实例
const instances = new Proxy(new Map<string, DialogInstance>(), {
  get: (target, key) => {
    if (key === "get") {
      return (prop: string) => {
        return Reflect.get(target, prop);
      };
    }

    if (key === "set") {
      return (prop: string, value: DialogInstance) => {
        if (value.opened.value && !value.app) {
          const parentNode = value.appendToBody ? document.body : document.getElementById('app')!;
          const container = document.createElement('div')
          container.setAttribute('data-dialog-id', value.id)
          container.setAttribute('data-dialog-type', value.type)
          value.app = createApp({
            render: () => h(dialogs.get(value.type)!, {
              opened: value.opened.value,
              ...value.props
            })
          })
          value.app.mount(container);
          parentNode.appendChild(container);
        }
        return Reflect.set(target, prop, value);
      };
    }

    if (key === "delete") {
      return (prop: string) => {
        const instance = instances.get(prop)!;
        if (instance.app) {
          instance.app.unmount();
          instance.app._container.remove();
        }
        return Reflect.deleteProperty(target, prop);
      };
    }

    if (key === 'has') {
      return (prop: string) => {
        return Reflect.has(target, prop);
      };
    }
  },
});

// 批量注册弹窗组件
export const registerBatch = (components: Partial<Record<Dialog["type"], any>>) => {
  for (const [type, component] of Object.entries(components)) {
    if (dialogs.has(type as Dialog["type"])) {
      throw new Error(`Dialog type ${type} has been registered`);
    }
    dialogs.set(type as Dialog["type"], component);
  }
};

// 批量注销弹窗
export const unregisterBatch = (components: Partial<Record<Dialog["type"], any>>) => {
  for (const [type] of Object.entries(components)) {
    if (!dialogs.has(type as Dialog["type"])) {
      throw new Error(`Dialog type ${type} has not been registered`);
    }
    dialogs.delete(type as Dialog["type"]);
  }
};

export const useDialog = <T extends object>(
  type: Dialog["type"],
  options?: DialogOptions & T
) => {
  // 校验弹窗类型是否已注册
  if (!dialogs.has(type)) {
    throw new Error(`Dialog type ${type} has not been registered`);
  }
  // 初始化弹窗选项 默认不关闭其他弹窗 销毁实例 挂载到 body
  const {
    closed = false,
    destroyed = true,
    appendToBody = true,
    ...props
  } = options || {};

  const id = useId();
  const opened = ref(false);

  watch(opened, () => {
    if (opened.value && closed) {
      // 处理数组情况下
      if (Array.isArray(closed)) {
        for (const id of closed) {
          const instance = instances.get(id)!;
          instance.opened.value = false
        }
      } else {
        // 关闭所有弹窗
        for (const instance of instances.values()) {
          instance.opened.value = false
        }
      }
    }
    
    const instance = instances.has(id) ?  instances.get(id) as DialogInstance : {
      id,
      type,
      opened,
      appendToBody,
      props
    };
    // 同步可见状态，由 Proxy 执行挂载/卸载副作用
    instances.set(id, instance);
    // 关闭且需要销毁，删除实例以触发卸载清理
    if (!opened.value && destroyed) {
      instances.delete(id);
    }
  });

  return {
    id,
    opened,
  };
};
