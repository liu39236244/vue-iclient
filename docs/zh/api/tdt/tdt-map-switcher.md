# 地图切换

<!-- <sm-iframe src="http://iclient.supermap.io/examples/mapboxgl/components_webmap_vue.html"></sm-iframe> -->

```vue
<sm-web-map server-url="http://support.supermap.com.cn:8092/" map-id="1649097980">
  <sm-tdt-map-switcher position="top-left" :data="{tk:1d109683f4d84198e37a38c442d68311}" :collapsed="false"></sm-tdt-map-switcher>
</sm-web-map>
```

### Attributes

| 参数       | 说明                                                                            | 类型    | 可选值                                                       | 默认值                             |
| :--------- | :------------------------------------------------------------------------------ | :------ | :----------------------------------------------------------- | :--------------------------------- |
| iconClass  | 收缩按钮 Icon 类名                                                              | string  | -                                                            | 'sm-components-icons-baselayer'    |
| collapsed  | 是否折叠                                                                        | boolean | -                                                            | true                               |
| autoRotate | 是否自动旋转                                                                    | boolean | -                                                            | false                              |
| headerName | 标题名                                                                          | string  | -                                                            | '地图切换'                         |
| position   | 显示位置，添加为地图的子组件（[slot](https://cn.vuejs.org/v2/api/#slot)）时生效 | string  | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'top-left'                         |
| data       | 地图切换配置                                                                    | object  | -                                                            | {select: '', label: false, tk: ''} |