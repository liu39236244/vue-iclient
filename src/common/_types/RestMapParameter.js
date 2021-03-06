import { geti18n } from '../_lang';

export default class RestMapParameter {
  constructor(options) {
    this.type = 'iServer';
    this.url = options.url;
    this.layerName = options.layerName;
    this.attributeFilter = options.attributeFilter || null;
    this.maxFeatures = options.maxFeatures || 20;
    this.name = options.name || geti18n().t('commontypes.restMap');
    this.proxy = options.proxy;
  }
}
