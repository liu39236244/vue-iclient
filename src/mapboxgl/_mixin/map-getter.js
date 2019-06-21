// 新创建一个vue实例实时监听获得map对象
import mapEvent from '../_types/map-event';
import globalEvent from '../../common/_utils/global-event';

function callHook(vm, hook, map) {
  const { options } = vm.constructor;
  options.mixins &&
    options.mixins.forEach(mixin => {
      mixin[hook] && mixin[hook].call(vm, vm.$options.name, map);
    });
  options[hook] && options[hook].call(vm, map); // 调用子组件的生命周期
}
/**
 * Description
 * @mixin mapGetter
 * @desc 监听 WebMap 和 Map 的 load 事件。
 * @category Mixin
 * @vue-computed {String} getMapTarget - 获取当前 Map 的 target。
 * @vue-event loaded - 组件加载渲染完成之后触发。
 */
export default {
  props: {
    mapTarget: {
      type: String
    }
  },
  watch: {
    mapTarget(newVal) {
      this.loadMap(newVal);
    }
  },
  mounted() {
    const targetName = this.getTargetName();
    if (mapEvent.$options.getMap(targetName)) {
      this.loadMap(targetName);
    }
    mapEvent.$on('load-map', this.loadMapSucceed);
    globalEvent.$on('delete-map', this.deleteMapSucceed);
  },
  beforeDestroy () {
    mapEvent.$off('load-map');
    globalEvent.$off('delete-map');
  },
  loaded() {
    // 微件生命周期方法(挂载后调用)，子类实现【组件主要业务逻辑写在这个生命周期里】
  },
  methods: {
    loadMapSucceed(map, target) {
      const targetName = this.getTargetName();
      if (target === targetName) {
        this.loadMap(target);
      }
    },
    getTargetName() {
      /**
       * 便于区分存在多个map时，子组件对应的map的渲染；
       * map 和 webmap  的 props 属性是 target 其他组件都叫 mapTarget
       * 如果子组件包裹在 map 组件里面，若没有传 mapTarget, 则 targetName 直接取父元素的target 的值
       * 如果子组件和 map 同层级，且没有设置 mapTarget 时，则默认渲染到第一个 map 上
       *
       */
      const selfParent = this.$parent;
      const parentTarget = selfParent.$options.name && selfParent.$options.name.toLowerCase() === 'smwebmap' && selfParent.target;
      return this.mapTarget || parentTarget || mapEvent.firstMapTarget;
    },
    loadMap(targetName) {
      this.map = mapEvent.$options.getMap(targetName);
      this.webmap = mapEvent.$options.getWebMap(targetName);
      callHook(this, 'loaded');
      // 控制与map组件同级的组件的显示加载
      this.$nextTick(() => {
        /**
         * @event loaded
         * @desc 组件加载渲染完成之后触发。
         */
        this.$emit('loaded');
      });
    },
    deleteMapSucceed(target) {
      const targetName = this.getTargetName();
      if (target === targetName) {
        this.map = null;
        this.webmap = null;
        this.destoryViewModal && this.destoryViewModal();
      }
    },
    nonMapTip() {
      this.$message.destroy();
      this.$message.warning('当前没有已加载完整的地图！');
    }
  }
};
