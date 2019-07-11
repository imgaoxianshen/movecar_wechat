(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /^\$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}



var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  });
}

function initVueComponent(Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage$$1 = _ref5.isPage,initRelation$$1 = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage$$1.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation$$1.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage$$1) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  initHooks(pageOptions.methods, hooks$1);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);


function callHook$1(vm, hook, params) {
  var handlers = vm.$options[hook];
  if (hook === 'onError' && handlers) {
    handlers = [handlers];
  }
  if(typeof handlers === 'function'){
    handlers = [handlers]
  }

  var ret;
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
//      try {
        ret = handlers[i].call(vm, params);
//       } catch (e) {//fixed by xxxxxx
//         handleError(e, vm, (hook + " hook"));
//       }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  // for child
  if (vm.$children.length) {
    vm.$children.forEach(function (v) {
      return callHook$1(v, hook, params);
    });
  }

  return ret
}

function getRootVueVm(page) {
  return page.$vm.$root;
}

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  return {
    // 页面的初始数据
    data: {
      $root: {}
    },

    // mp lifecycle for vue
    // 生命周期函数--监听页面加载
    onLoad:function onLoad(query) {
      //页面加载的时候
      var app = new vue__WEBPACK_IMPORTED_MODULE_0___default.a(App);
      // 挂载Vue对象到page上
      this.$vm = app;
      var rootVueVM = app.$root;
      rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__//fixed by xxxxxx(createIntersectionObserver)
      rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
      
      //初始化mp对象
      if (!rootVueVM.$mp) {
        rootVueVM.$mp = {};
      }
      var mp = rootVueVM.$mp;
      mp.mpType = 'page';
      mp.page = this;
      mp.query = query;
      mp.status = 'load';
      //mount 要在 mp.status = 'load';赋值之后，不然mount方法会重复添加微信Page
      //具体原因参考mpvue核心库源码，_initMP方法
      app.$mount();
    },

    handleProxy: function handleProxy(e) {
      var rootVueVM = getRootVueVm(this);
      return rootVueVM.$handleProxyWithVue(e)
    },

    // 生命周期函数--监听页面显示
    onShow:function onShow() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'show';
      callHook$1(rootVueVM, 'onShow');
      //   // 只有页面需要 setData
      rootVueVM.$nextTick(function () {
        rootVueVM._initDataToMP();
      });
    },

    // 生命周期函数--监听页面初次渲染完成
    onReady:function onReady() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'ready';
      callHook$1(rootVueVM, 'onReady');
    },

    // 生命周期函数--监听页面隐藏
    onHide: function onHide() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'hide';
      callHook$1(rootVueVM, 'onHide');
    },

    // 生命周期函数--监听页面卸载
    onUnload: function onUnload() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onUnload');
      rootVueVM.$destroy();
    },

    // 页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh: function onPullDownRefresh() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onPullDownRefresh');
    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function onReachBottom() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onReachBottom');
    },

    // Do something when page scroll
    onPageScroll: function onPageScroll(options) {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onPageScroll', options);
    },

    // 当前是 tab 页时，点击 tab 时触发
    onTabItemTap: function onTabItemTap(options) {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onTabItemTap', options);
    },
		
    // // 用户点击右上角分享
    onShareAppMessage: App.onShareAppMessage ?
      function (options) {
        var rootVueVM = getRootVueVm(this);
        return callHook$1(rootVueVM, 'onShareAppMessage', options);
      } : null,

    //fixed by xxxxxx
    onNavigationBarButtonTap: function onNavigationBarButtonTap(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarButtonTap", options)
    },
    onNavigationBarSearchInputChanged: function onNavigationBarSearchInputChanged(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputChanged", options)
    },
    onNavigationBarSearchInputConfirmed: function onNavigationBarSearchInputConfirmed(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputConfirmed", options)
    },
    onNavigationBarSearchInputClicked: function onNavigationBarSearchInputClicked(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputClicked", options)
    },
    onBackPress: function onBackPress(options) {
        var rootVueVM = getRootVueVm(this);
    		return callHook$1(rootVueVM, "onBackPress",options)
    },
		$getAppWebview:function (e) {
				return plus.webview.getWebviewById('' + this.__wxWebviewId__)
		}
  };
});


/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// fix env
try {
    if (!global) global = {}
    global.process = global.process || {}
    global.process.env = global.process.env || {}
    global.App = global.App || App
    global.Page = global.Page || Page
    global.Component = global.Component || Component
    global.getApp = global.getApp || getApp
} catch (e) {}

;(function(global, factory) {
     true
        ? (module.exports = factory())
        : undefined
})(this, function() {
    "use strict"

    //fixed by xxxxxx
    function calcDiff(holder, key, newObj, oldObj) {
        if (newObj === oldObj || newObj === undefined) {
            return
        }

        if (newObj == null || oldObj == null || typeof newObj !== typeof oldObj) {
            holder[key] = newObj
        } else if (Array.isArray(newObj) && Array.isArray(oldObj)) {
            if (newObj.length === oldObj.length) {
                for (var i = 0, len = newObj.length; i < len; ++i) {
                    calcDiff(holder, key + "[" + i + "]", newObj[i], oldObj[i])
                }
            } else {
                holder[key] = newObj
            }
        } else if (typeof newObj === "object" && typeof oldObj === "object") {
            var newKeys = Object.keys(newObj)
            var oldKeys = Object.keys(oldObj)

            if (newKeys.length !== oldKeys.length) {
                holder[key] = newObj
            } else {
                var allKeysSet = Object.create(null)
                for (var i = 0, len = newKeys.length; i < len; ++i) {
                    allKeysSet[newKeys[i]] = true
                    allKeysSet[oldKeys[i]] = true
                }
                if (Object.keys(allKeysSet).length !== newKeys.length) {
                    holder[key] = newObj
                } else {
                    for (var i = 0, len = newKeys.length; i < len; ++i) {
                        var k = newKeys[i]
                        calcDiff(holder, key + "." + k, newObj[k], oldObj[k])
                    }
                }
            }
        } else if (newObj !== oldObj) {
            holder[key] = newObj
        }
    }

    function diff(newObj, oldObj) {
        var keys = Object.keys(newObj)
        var diffResult = {}
        for (var i = 0, len = keys.length; i < len; ++i) {
            var k = keys[i]
            var oldKeyPath = k.split(".")
            var oldValue = oldObj[oldKeyPath[0]]
            for (var j = 1, jlen = oldKeyPath.length; j < jlen && oldValue !== undefined; ++j) {
                oldValue = oldValue[oldKeyPath[j]]
            }
            calcDiff(diffResult, k, newObj[k], oldValue)
        }
        return diffResult
    }

    /*  */

    // these helpers produces better vm code in JS engines due to their
    // explicitness and function inlining
    function isUndef(v) {
        return v === undefined || v === null
    }

    function isDef(v) {
        return v !== undefined && v !== null
    }

    function isTrue(v) {
        return v === true
    }

    function isFalse(v) {
        return v === false
    }

    /**
     * Check if value is primitive
     */
    function isPrimitive(value) {
        return typeof value === "string" || typeof value === "number"
    }

    /**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     */
    function isObject(obj) {
        return obj !== null && typeof obj === "object"
    }

    var _toString = Object.prototype.toString

    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     */
    function isPlainObject(obj) {
        return _toString.call(obj) === "[object Object]"
    }

    function isRegExp(v) {
        return _toString.call(v) === "[object RegExp]"
    }

    /**
     * Check if val is a valid array index.
     */
    function isValidArrayIndex(val) {
        var n = parseFloat(val)
        return n >= 0 && Math.floor(n) === n && isFinite(val)
    }

    /**
     * Convert a value to a string that is actually rendered.
     */
    function toString(val) {
        return val == null
            ? ""
            : typeof val === "object"
                ? JSON.stringify(val, null, 2)
                : String(val)
    }

    /**
     * Convert a input value to a number for persistence.
     * If the conversion fails, return original string.
     */
    function toNumber(val) {
        var n = parseFloat(val)
        return isNaN(n) ? val : n
    }

    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     */
    function makeMap(str, expectsLowerCase) {
        var map = Object.create(null)
        var list = str.split(",")
        for (var i = 0; i < list.length; i++) {
            map[list[i]] = true
        }
        return expectsLowerCase
            ? function(val) {
                  return map[val.toLowerCase()]
              }
            : function(val) {
                  return map[val]
              }
    }

    /**
     * Check if a tag is a built-in tag.
     */
    var isBuiltInTag = makeMap("slot,component", true)

    /**
     * Check if a attribute is a reserved attribute.
     */
    var isReservedAttribute = makeMap("key,ref,slot,is")

    /**
     * Remove an item from an array
     */
    function remove(arr, item) {
        if (arr.length) {
            var index = arr.indexOf(item)
            if (index > -1) {
                return arr.splice(index, 1)
            }
        }
    }

    /**
     * Check whether the object has the property.
     */
    var hasOwnProperty = Object.prototype.hasOwnProperty

    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key)
    }

    /**
     * Create a cached version of a pure function.
     */
    function cached(fn) {
        var cache = Object.create(null)
        return function cachedFn(str) {
            var hit = cache[str]
            return hit || (cache[str] = fn(str))
        }
    }

    /**
     * Camelize a hyphen-delimited string.
     */
    var camelizeRE = /-(\w)/g
    var camelize = cached(function(str) {
        return str.replace(camelizeRE, function(_, c) {
            return c ? c.toUpperCase() : ""
        })
    })

    /**
     * Capitalize a string.
     */
    var capitalize = cached(function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    })

    /**
     * Hyphenate a camelCase string.
     */
    var hyphenateRE = /([^-])([A-Z])/g
    var hyphenate = cached(function(str) {
        return str
            .replace(hyphenateRE, "$1-$2")
            .replace(hyphenateRE, "$1-$2")
            .toLowerCase()
    })

    /**
     * Simple bind, faster than native
     */
    function bind(fn, ctx) {
        function boundFn(a) {
            var l = arguments.length
            return l ? (l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a)) : fn.call(ctx)
        }
        // record original fn length
        boundFn._length = fn.length
        return boundFn
    }

    /**
     * Convert an Array-like object to a real Array.
     */
    function toArray(list, start) {
        start = start || 0
        var i = list.length - start
        var ret = new Array(i)
        while (i--) {
            ret[i] = list[i + start]
        }
        return ret
    }

    /**
     * Mix properties into target object.
     */
    function extend(to, _from) {
        for (var key in _from) {
            to[key] = _from[key]
        }
        return to
    }

    /**
     * Merge an Array of Objects into a single Object.
     */
    function toObject(arr) {
        var res = {}
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
                extend(res, arr[i])
            }
        }
        return res
    }

    /**
     * Perform no operation.
     * Stubbing args to make Flow happy without leaving useless transpiled code
     * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
     */
    function noop(a, b, c) {}

    /**
     * Always return false.
     */
    var no = function(a, b, c) {
        return false
    }

    /**
     * Return same value
     */
    var identity = function(_) {
        return _
    }

    /**
     * Generate a static keys string from compiler modules.
     */

    /**
     * Check if two values are loosely equal - that is,
     * if they are plain objects, do they have the same shape?
     */
    function looseEqual(a, b) {
        var isObjectA = isObject(a)
        var isObjectB = isObject(b)
        if (isObjectA && isObjectB) {
            try {
                return JSON.stringify(a) === JSON.stringify(b)
            } catch (e) {
                // possible circular reference
                return a === b
            }
        } else if (!isObjectA && !isObjectB) {
            return String(a) === String(b)
        } else {
            return false
        }
    }

    function looseIndexOf(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (looseEqual(arr[i], val)) {
                return i
            }
        }
        return -1
    }

    /**
     * Ensure a function is called only once.
     */
    function once(fn) {
        var called = false
        return function() {
            if (!called) {
                called = true
                fn.apply(this, arguments)
            }
        }
    }

    var SSR_ATTR = "data-server-rendered"

    var ASSET_TYPES = ["component", "directive", "filter"]

    var LIFECYCLE_HOOKS = [
        "beforeCreate",
        "created",
        "beforeMount",
        "mounted",
        "beforeUpdate",
        "updated",
        "beforeDestroy",
        "destroyed",
        "activated",
        "deactivated",
        "onLaunch",
        "onLoad",
        "onShow",
        "onReady",
        "onHide",
        "onUnload",
        "onPullDownRefresh",
        "onReachBottom",
        "onShareAppMessage",
        "onPageScroll",
        "onTabItemTap",
        "attached",
        "ready",
        "moved",
        "detached",
        "onUniNViewMessage", //fixed by xxxxxx
        "onNavigationBarButtonTap", //fixed by xxxxxx
        "onBackPress",//fixed by xxxxxx
    ]

    /*  */

    var config = {
        /**
         * Option merge strategies (used in core/util/options)
         */
        optionMergeStrategies: Object.create(null),

        /**
         * Whether to suppress warnings.
         */
        silent: false,

        /**
         * Show production mode tip message on boot?
         */
        productionTip: "production" !== "production",

        /**
         * Whether to enable devtools
         */
        devtools: "production" !== "production",

        /**
         * Whether to record perf
         */
        performance: false,

        /**
         * Error handler for watcher errors
         */
        errorHandler: null,

        /**
         * Warn handler for watcher warns
         */
        warnHandler: null,

        /**
         * Ignore certain custom elements
         */
        ignoredElements: [],

        /**
         * Custom user key aliases for v-on
         */
        keyCodes: Object.create(null),

        /**
         * Check if a tag is reserved so that it cannot be registered as a
         * component. This is platform-dependent and may be overwritten.
         */
        isReservedTag: no,

        /**
         * Check if an attribute is reserved so that it cannot be used as a component
         * prop. This is platform-dependent and may be overwritten.
         */
        isReservedAttr: no,

        /**
         * Check if a tag is an unknown element.
         * Platform-dependent.
         */
        isUnknownElement: no,

        /**
         * Get the namespace of an element
         */
        getTagNamespace: noop,

        /**
         * Parse the real tag name for the specific platform.
         */
        parsePlatformTagName: identity,

        /**
         * Check if an attribute must be bound using property, e.g. value
         * Platform-dependent.
         */
        mustUseProp: no,

        /**
         * Exposed for legacy reasons
         */
        _lifecycleHooks: LIFECYCLE_HOOKS
    }

    /*  */

    var emptyObject = Object.freeze({})

    /**
     * Check if a string starts with $ or _
     */
    function isReserved(str) {
        var c = (str + "").charCodeAt(0)
        return c === 0x24 || c === 0x5f
    }

    /**
     * Define a property.
     */
    function def(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        })
    }

    /**
     * Parse simple path.
     */
    var bailRE = /[^\w.$]/

    function parsePath(path) {
        if (bailRE.test(path)) {
            return
        }
        var segments = path.split(".")
        return function(obj) {
            for (var i = 0; i < segments.length; i++) {
                if (!obj) {
                    return
                }
                obj = obj[segments[i]]
            }
            return obj
        }
    }

    /*  */

    var warn = noop

    var formatComponentName = null // work around flow check

    /*  */

    function handleError(err, vm, info) {
        if (config.errorHandler) {
            config.errorHandler.call(null, err, vm, info)
        } else {
            if (inBrowser && typeof console !== "undefined") {
                console.error(err)
            } else {
                throw err
            }
        }
    }

    /*  */

    // can we use __proto__?
    var hasProto = "__proto__" in {}

    // Browser environment sniffing
    var inBrowser = typeof window !== "undefined"
    var UA = ["mpvue-runtime"].join()
    var isIE = UA && /msie|trident/.test(UA)
    var isIE9 = UA && UA.indexOf("msie 9.0") > 0
    var isEdge = UA && UA.indexOf("edge/") > 0
    var isAndroid = UA && UA.indexOf("android") > 0
    var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
    var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

    // Firefix has a "watch" function on Object.prototype...
    var nativeWatch = {}.watch

    var supportsPassive = false
    if (inBrowser) {
        try {
            var opts = {}
            Object.defineProperty(opts, "passive", {
                get: function get() {
                    /* istanbul ignore next */
                    supportsPassive = true
                }
            }) // https://github.com/facebook/flow/issues/285
            window.addEventListener("test-passive", null, opts)
        } catch (e) {}
    }

    // this needs to be lazy-evaled because vue may be required before
    // vue-server-renderer can set VUE_ENV
    var _isServer
    var isServerRendering = function() {
        if (_isServer === undefined) {
            /* istanbul ignore if */
            if (!inBrowser && typeof global !== "undefined") {
                // detect presence of vue-server-renderer and avoid
                // Webpack shimming the process
                _isServer = global["process"].env.VUE_ENV === "server"
            } else {
                _isServer = false
            }
        }
        return _isServer
    }

    // detect devtools
    var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

    /* istanbul ignore next */
    function isNative(Ctor) {
        return typeof Ctor === "function" && /native code/.test(Ctor.toString())
    }

    var hasSymbol =
        typeof Symbol !== "undefined" &&
        isNative(Symbol) &&
        typeof Reflect !== "undefined" &&
        isNative(Reflect.ownKeys)

    /**
     * Defer a task to execute it asynchronously.
     */
    var nextTick = (function() {
        var callbacks = []
        var pending = false
        var timerFunc

        function nextTickHandler() {
            pending = false
            var copies = callbacks.slice(0)
            callbacks.length = 0
            for (var i = 0; i < copies.length; i++) {
                copies[i]()
            }
        }

        // the nextTick behavior leverages the microtask queue, which can be accessed
        // via either native Promise.then or MutationObserver.
        // MutationObserver has wider support, however it is seriously bugged in
        // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
        // completely stops working after triggering a few times... so, if native
        // Promise is available, we will use it:
        /* istanbul ignore if */
        if (typeof Promise !== "undefined" && isNative(Promise)) {
            var p = Promise.resolve()
            var logError = function(err) {
                console.error(err)
            }
            timerFunc = function() {
                p.then(nextTickHandler).catch(logError)
                // in problematic UIWebViews, Promise.then doesn't completely break, but
                // it can get stuck in a weird state where callbacks are pushed into the
                // microtask queue but the queue isn't being flushed, until the browser
                // needs to do some other work, e.g. handle a timer. Therefore we can
                // "force" the microtask queue to be flushed by adding an empty timer.
                if (isIOS) {
                    setTimeout(noop)
                }
            }
            // } else if (typeof MutationObserver !== 'undefined' && (
            //   isNative(MutationObserver) ||
            //   // PhantomJS and iOS 7.x
            //   MutationObserver.toString() === '[object MutationObserverConstructor]'
            // )) {
            //   // use MutationObserver where native Promise is not available,
            //   // e.g. PhantomJS IE11, iOS7, Android 4.4
            //   var counter = 1
            //   var observer = new MutationObserver(nextTickHandler)
            //   var textNode = document.createTextNode(String(counter))
            //   observer.observe(textNode, {
            //     characterData: true
            //   })
            //   timerFunc = () => {
            //     counter = (counter + 1) % 2
            //     textNode.data = String(counter)
            //   }
        } else {
            // fallback to setTimeout
            /* istanbul ignore next */
            timerFunc = function() {
                setTimeout(nextTickHandler, 0)
            }
        }

        return function queueNextTick(cb, ctx) {
            var _resolve
            callbacks.push(function() {
                if (cb) {
                    try {
                        cb.call(ctx)
                    } catch (e) {
                        handleError(e, ctx, "nextTick")
                    }
                } else if (_resolve) {
                    _resolve(ctx)
                }
            })
            if (!pending) {
                pending = true
                timerFunc()
            }
            if (!cb && typeof Promise !== "undefined") {
                return new Promise(function(resolve, reject) {
                    _resolve = resolve
                })
            }
        }
    })()

    var _Set
    /* istanbul ignore if */
    if (typeof Set !== "undefined" && isNative(Set)) {
        // use native Set when available.
        _Set = Set
    } else {
        // a non-standard Set polyfill that only works with primitive keys.
        _Set = (function() {
            function Set() {
                this.set = Object.create(null)
            }
            Set.prototype.has = function has(key) {
                return this.set[key] === true
            }
            Set.prototype.add = function add(key) {
                this.set[key] = true
            }
            Set.prototype.clear = function clear() {
                this.set = Object.create(null)
            }

            return Set
        })()
    }

    /*  */

    var uid$1 = 0

    /**
     * A dep is an observable that can have multiple
     * directives subscribing to it.
     */
    var Dep = function Dep() {
        this.id = uid$1++
        this.subs = []
    }

    Dep.prototype.addSub = function addSub(sub) {
        this.subs.push(sub)
    }

    Dep.prototype.removeSub = function removeSub(sub) {
        remove(this.subs, sub)
    }

    Dep.prototype.depend = function depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    Dep.prototype.notify = function notify() {
        // stabilize the subscriber list first
        var subs = this.subs.slice()
        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }

    // the current target watcher being evaluated.
    // this is globally unique because there could be only one
    // watcher being evaluated at any time.
    Dep.target = null
    var targetStack = []

    function pushTarget(_target) {
        if (Dep.target) {
            targetStack.push(Dep.target)
        }
        Dep.target = _target
    }

    function popTarget() {
        Dep.target = targetStack.pop()
    }

    /*
     * not type checking this file because flow doesn't play well with
     * dynamically accessing methods on Array prototype
     */

    var arrayProto = Array.prototype
    var arrayMethods = Object.create(arrayProto)
    ;["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function(method) {
        // cache original method
        var original = arrayProto[method]
        def(arrayMethods, method, function mutator() {
            var args = [],
                len = arguments.length
            while (len--) args[len] = arguments[len]

            var result = original.apply(this, args)
            var ob = this.__ob__
            var inserted
            switch (method) {
                case "push":
                case "unshift":
                    inserted = args
                    break
                case "splice":
                    inserted = args.slice(2)
                    break
            }
            if (inserted) {
                ob.observeArray(inserted)
            }
            // notify change
            ob.dep.notify()
            return result
        })
    })

    /*  */

    var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

    /**
     * By default, when a reactive property is set, the new value is
     * also converted to become reactive. However when passing down props,
     * we don't want to force conversion because the value may be a nested value
     * under a frozen data structure. Converting it would defeat the optimization.
     */
    var observerState = {
        shouldConvert: true
    }

    /**
     * Observer class that are attached to each observed
     * object. Once attached, the observer converts target
     * object's property keys into getter/setters that
     * collect dependencies and dispatches updates.
     */
    var Observer = function Observer(value) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        def(value, "__ob__", this)
        if (Array.isArray(value)) {
            var augment = hasProto ? protoAugment : copyAugment
            augment(value, arrayMethods, arrayKeys)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    /**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    Observer.prototype.walk = function walk(obj) {
        var keys = Object.keys(obj)
        for (var i = 0; i < keys.length; i++) {
            defineReactive$$1(obj, keys[i], obj[keys[i]])
        }
    }

    /**
     * Observe a list of Array items.
     */
    Observer.prototype.observeArray = function observeArray(items) {
        for (var i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }

    // helpers

    /**
     * Augment an target Object or Array by intercepting
     * the prototype chain using __proto__
     */
    function protoAugment(target, src, keys) {
        /* eslint-disable no-proto */
        target.__proto__ = src
        /* eslint-enable no-proto */
    }

    /**
     * Augment an target Object or Array by defining
     * hidden properties.
     */
    /* istanbul ignore next */
    function copyAugment(target, src, keys) {
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i]
            def(target, key, src[key])
        }
    }

    /**
     * Attempt to create an observer instance for a value,
     * returns the new observer if successfully observed,
     * or the existing observer if the value already has one.
     */
    function observe(value, asRootData) {
        if (!isObject(value)) {
            return
        }
        var ob
        if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
            ob = value.__ob__
        } else if (
            observerState.shouldConvert &&
            !isServerRendering() &&
            (Array.isArray(value) || isPlainObject(value)) &&
            Object.isExtensible(value) &&
            !value._isVue
        ) {
            ob = new Observer(value)
        }
        if (asRootData && ob) {
            ob.vmCount++
        }
        return ob
    }

    /**
     * Define a reactive property on an Object.
     */
    function defineReactive$$1(obj, key, val, customSetter, shallow) {
        var dep = new Dep()

        var property = Object.getOwnPropertyDescriptor(obj, key)
        if (property && property.configurable === false) {
            return
        }

        // cater for pre-defined getter/setters
        var getter = property && property.get
        var setter = property && property.set

        var childOb = !shallow && observe(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                var value = getter ? getter.call(obj) : val
                if (Dep.target) {
                    dep.depend()
                    if (childOb) {
                        childOb.dep.depend()
                    }
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
                return value
            },
            set: function reactiveSetter(newVal) {
                var value = getter ? getter.call(obj) : val
                /* eslint-disable no-self-compare */
                if (newVal === value || (newVal !== newVal && value !== value)) {
                    return
                }
                /* eslint-enable no-self-compare */
                if (false) {}
                if (setter) {
                    setter.call(obj, newVal)
                } else {
                    val = newVal
                }
                childOb = !shallow && observe(newVal)
                dep.notify()
            }
        })
    }

    /**
     * Set a property on an object. Adds the new property and
     * triggers change notification if the property doesn't
     * already exist.
     */
    function set(target, key, val) {
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key)
            target.splice(key, 1, val)
            return val
        }
        if (hasOwn(target, key)) {
            target[key] = val
            return val
        }
        var ob = target.__ob__
        if (target._isVue || (ob && ob.vmCount)) {
             false &&
                false
            return val
        }
        if (!ob) {
            target[key] = val
            return val
        }
        defineReactive$$1(ob.value, key, val)
        ob.dep.notify()
        return val
    }

    /**
     * Delete a property and trigger change if necessary.
     */
    function del(target, key) {
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.splice(key, 1)
            return
        }
        var ob = target.__ob__
        if (target._isVue || (ob && ob.vmCount)) {
             false &&
                false
            return
        }
        if (!hasOwn(target, key)) {
            return
        }
        delete target[key]
        if (!ob) {
            return
        }
        ob.dep.notify()
    }

    /**
     * Collect dependencies on array elements when the array is touched, since
     * we cannot intercept array element access like property getters.
     */
    function dependArray(value) {
        for (var e = void 0, i = 0, l = value.length; i < l; i++) {
            e = value[i]
            e && e.__ob__ && e.__ob__.dep.depend()
            if (Array.isArray(e)) {
                dependArray(e)
            }
        }
    }

    /*  */

    /**
     * Option overwriting strategies are functions that handle
     * how to merge a parent option value and a child option
     * value into the final value.
     */
    var strats = config.optionMergeStrategies

    /**
     * Options with restrictions
     */
    /**
     * Helper that recursively merges two data objects together.
     */
    function mergeData(to, from) {
        if (!from) {
            return to
        }
        var key, toVal, fromVal
        var keys = Object.keys(from)
        for (var i = 0; i < keys.length; i++) {
            key = keys[i]
            toVal = to[key]
            fromVal = from[key]
            if (!hasOwn(to, key)) {
                set(to, key, fromVal)
            } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
                mergeData(toVal, fromVal)
            }
        }
        return to
    }

    /**
     * Data
     */
    function mergeDataOrFn(parentVal, childVal, vm) {
        if (!vm) {
            // in a Vue.extend merge, both should be functions
            if (!childVal) {
                return parentVal
            }
            if (!parentVal) {
                return childVal
            }
            // when parentVal & childVal are both present,
            // we need to return a function that returns the
            // merged result of both functions... no need to
            // check if parentVal is a function here because
            // it has to be a function to pass previous merges.
            return function mergedDataFn() {
                return mergeData(
                    typeof childVal === "function" ? childVal.call(this) : childVal,
                    parentVal.call(this)
                )
            }
        } else if (parentVal || childVal) {
            return function mergedInstanceDataFn() {
                // instance merge
                var instanceData = typeof childVal === "function" ? childVal.call(vm) : childVal
                var defaultData = typeof parentVal === "function" ? parentVal.call(vm) : undefined
                if (instanceData) {
                    return mergeData(instanceData, defaultData)
                } else {
                    return defaultData
                }
            }
        }
    }

    strats.data = function(parentVal, childVal, vm) {
        if (!vm) {
            if (childVal && typeof childVal !== "function") {
                 false &&
                    false

                return parentVal
            }
            return mergeDataOrFn.call(this, parentVal, childVal)
        }

        return mergeDataOrFn(parentVal, childVal, vm)
    }

    /**
     * Hooks and props are merged as arrays.
     */
    function mergeHook(parentVal, childVal) {
        return childVal
            ? parentVal
                ? parentVal.concat(childVal)
                : Array.isArray(childVal)
                    ? childVal
                    : [childVal]
            : parentVal
    }

    LIFECYCLE_HOOKS.forEach(function(hook) {
        strats[hook] = mergeHook
    })

    /**
     * Assets
     *
     * When a vm is present (instance creation), we need to do
     * a three-way merge between constructor options, instance
     * options and parent options.
     */
    function mergeAssets(parentVal, childVal) {
        var res = Object.create(parentVal || null)
        return childVal ? extend(res, childVal) : res
    }

    ASSET_TYPES.forEach(function(type) {
        strats[type + "s"] = mergeAssets
    })

    /**
     * Watchers.
     *
     * Watchers hashes should not overwrite one
     * another, so we merge them as arrays.
     */
    strats.watch = function(parentVal, childVal) {
        // work around Firefox's Object.prototype.watch...
        if (parentVal === nativeWatch) {
            parentVal = undefined
        }
        if (childVal === nativeWatch) {
            childVal = undefined
        }
        /* istanbul ignore if */
        if (!childVal) {
            return Object.create(parentVal || null)
        }
        if (!parentVal) {
            return childVal
        }
        var ret = {}
        extend(ret, parentVal)
        for (var key in childVal) {
            var parent = ret[key]
            var child = childVal[key]
            if (parent && !Array.isArray(parent)) {
                parent = [parent]
            }
            ret[key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child]
        }
        return ret
    }

    /**
     * Other object hashes.
     */
    strats.props = strats.methods = strats.inject = strats.computed = function(
        parentVal,
        childVal
    ) {
        if (!childVal) {
            return Object.create(parentVal || null)
        }
        if (!parentVal) {
            return childVal
        }
        var ret = Object.create(null)
        extend(ret, parentVal)
        extend(ret, childVal)
        return ret
    }
    strats.provide = mergeDataOrFn

    /**
     * Default strategy.
     */
    var defaultStrat = function(parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal
    }

    /**
     * Ensure all props option syntax are normalized into the
     * Object-based format.
     */
    function normalizeProps(options) {
        var props = options.props
        if (!props) {
            return
        }
        var res = {}
        var i, val, name
        if (Array.isArray(props)) {
            i = props.length
            while (i--) {
                val = props[i]
                if (typeof val === "string") {
                    name = camelize(val)
                    res[name] = {
                        type: null
                    }
                } else {
                }
            }
        } else if (isPlainObject(props)) {
            for (var key in props) {
                val = props[key]
                name = camelize(key)
                res[name] = isPlainObject(val)
                    ? val
                    : {
                          type: val
                      }
            }
        }
        options.props = res
    }

    /**
     * Normalize all injections into Object-based format
     */
    function normalizeInject(options) {
        var inject = options.inject
        if (Array.isArray(inject)) {
            var normalized = (options.inject = {})
            for (var i = 0; i < inject.length; i++) {
                normalized[inject[i]] = inject[i]
            }
        }
    }

    /**
     * Normalize raw function directives into object format.
     */
    function normalizeDirectives(options) {
        var dirs = options.directives
        if (dirs) {
            for (var key in dirs) {
                var def = dirs[key]
                if (typeof def === "function") {
                    dirs[key] = {
                        bind: def,
                        update: def
                    }
                }
            }
        }
    }

    /**
     * Merge two option objects into a new one.
     * Core utility used in both instantiation and inheritance.
     */
    function mergeOptions(parent, child, vm) {
        if (typeof child === "function") {
            child = child.options
        }

        normalizeProps(child)
        normalizeInject(child)
        normalizeDirectives(child)
        var extendsFrom = child.extends
        if (extendsFrom) {
            parent = mergeOptions(parent, extendsFrom, vm)
        }
        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm)
            }
        }
        var options = {}
        var key
        for (key in parent) {
            mergeField(key)
        }
        for (key in child) {
            if (!hasOwn(parent, key)) {
                mergeField(key)
            }
        }

        function mergeField(key) {
            var strat = strats[key] || defaultStrat
            options[key] = strat(parent[key], child[key], vm, key)
        }
        return options
    }

    /**
     * Resolve an asset.
     * This function is used because child instances need access
     * to assets defined in its ancestor chain.
     */
    function resolveAsset(options, type, id, warnMissing) {
        /* istanbul ignore if */
        if (typeof id !== "string") {
            return
        }
        var assets = options[type]
        // check local registration variations first
        if (hasOwn(assets, id)) {
            return assets[id]
        }
        var camelizedId = camelize(id)
        if (hasOwn(assets, camelizedId)) {
            return assets[camelizedId]
        }
        var PascalCaseId = capitalize(camelizedId)
        if (hasOwn(assets, PascalCaseId)) {
            return assets[PascalCaseId]
        }
        // fallback to prototype chain
        var res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
        if (false) {}
        return res
    }

    /*  */

    function validateProp(key, propOptions, propsData, vm) {
        var prop = propOptions[key]
        var absent = !hasOwn(propsData, key)
        var value = propsData[key]
        // handle boolean props
        if (isType(Boolean, prop.type)) {
            if (absent && !hasOwn(prop, "default")) {
                value = false
            } else if (!isType(String, prop.type) && (value === "" || value === hyphenate(key))) {
                value = true
            }
        }
        // check default value
        if (value === undefined) {
            value = getPropDefaultValue(vm, prop, key)
            // since the default value is a fresh copy,
            // make sure to observe it.
            var prevShouldConvert = observerState.shouldConvert
            observerState.shouldConvert = true
            observe(value)
            observerState.shouldConvert = prevShouldConvert
        }
        return value
    }

    /**
     * Get the default value of a prop.
     */
    function getPropDefaultValue(vm, prop, key) {
        // no default, return undefined
        if (!hasOwn(prop, "default")) {
            return undefined
        }
        var def = prop.default
        // warn against non-factory defaults for Object & Array
        if (false) {}
        // the raw prop value was also undefined from previous render,
        // return previous default value to avoid unnecessary watcher trigger
        if (
            vm &&
            vm.$options.propsData &&
            vm.$options.propsData[key] === undefined &&
            vm._props[key] !== undefined
        ) {
            return vm._props[key]
        }
        // call factory function for non-Function types
        // a value is Function if its prototype is function even across different execution context
        return typeof def === "function" && getType(prop.type) !== "Function" ? def.call(vm) : def
    }

    /**
     * Use function string name to check built-in types,
     * because a simple equality check will fail when running
     * across different vms / iframes.
     */
    function getType(fn) {
        var match = fn && fn.toString().match(/^\s*function (\w+)/)
        return match ? match[1] : ""
    }

    function isType(type, fn) {
        if (!Array.isArray(fn)) {
            return getType(fn) === getType(type)
        }
        for (var i = 0, len = fn.length; i < len; i++) {
            if (getType(fn[i]) === getType(type)) {
                return true
            }
        }
        /* istanbul ignore next */
        return false
    }

    /*  */

    /* not type checking this file because flow doesn't play well with Proxy */

    var mark
    var measure

    /*  */

    var VNode = function VNode(
        tag,
        data,
        children,
        text,
        elm,
        context,
        componentOptions,
        asyncFactory
    ) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.ns = undefined
        this.context = context
        this.functionalContext = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }

    var prototypeAccessors = {
        child: {}
    }

    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    prototypeAccessors.child.get = function() {
        return this.componentInstance
    }

    Object.defineProperties(VNode.prototype, prototypeAccessors)

    var createEmptyVNode = function(text) {
        if (text === void 0) text = ""

        var node = new VNode()
        node.text = text
        node.isComment = true
        return node
    }

    function createTextVNode(val) {
        return new VNode(undefined, undefined, undefined, String(val))
    }

    // optimized shallow clone
    // used for static nodes and slot nodes because they may be reused across
    // multiple renders, cloning them avoids errors when DOM manipulations rely
    // on their elm reference.
    function cloneVNode(vnode) {
        var cloned = new VNode(
            vnode.tag,
            vnode.data,
            vnode.children,
            vnode.text,
            vnode.elm,
            vnode.context,
            vnode.componentOptions,
            vnode.asyncFactory
        )
        cloned.ns = vnode.ns
        cloned.isStatic = vnode.isStatic
        cloned.key = vnode.key
        cloned.isComment = vnode.isComment
        cloned.isCloned = true
        return cloned
    }

    function cloneVNodes(vnodes) {
        var len = vnodes.length
        var res = new Array(len)
        for (var i = 0; i < len; i++) {
            res[i] = cloneVNode(vnodes[i])
        }
        return res
    }

    /*  */

    var normalizeEvent = cached(function(name) {
        var passive = name.charAt(0) === "&"
        name = passive ? name.slice(1) : name
        var once$$1 = name.charAt(0) === "~" // Prefixed last, checked first
        name = once$$1 ? name.slice(1) : name
        var capture = name.charAt(0) === "!"
        name = capture ? name.slice(1) : name
        return {
            name: name,
            once: once$$1,
            capture: capture,
            passive: passive
        }
    })

    function createFnInvoker(fns) {
        function invoker() {
            var arguments$1 = arguments

            var fns = invoker.fns
            if (Array.isArray(fns)) {
                var cloned = fns.slice()
                for (var i = 0; i < cloned.length; i++) {
                    cloned[i].apply(null, arguments$1)
                }
            } else {
                // return handler return value for single handlers
                return fns.apply(null, arguments)
            }
        }
        invoker.fns = fns
        return invoker
    }

    function updateListeners(on, oldOn, add, remove$$1, vm) {
        var name, cur, old, event
        for (name in on) {
            cur = on[name]
            old = oldOn[name]
            event = normalizeEvent(name)
            if (isUndef(cur)) {
                 false &&
                    false
            } else if (isUndef(old)) {
                if (isUndef(cur.fns)) {
                    cur = on[name] = createFnInvoker(cur)
                }
                add(event.name, cur, event.once, event.capture, event.passive)
            } else if (cur !== old) {
                old.fns = cur
                on[name] = old
            }
        }
        for (name in oldOn) {
            if (isUndef(on[name])) {
                event = normalizeEvent(name)
                remove$$1(event.name, oldOn[name], event.capture)
            }
        }
    }

    /*  */

    /*  */

    function extractPropsFromVNodeData(data, Ctor, tag) {
        // we are only extracting raw values here.
        // validation and default values are handled in the child
        // component itself.
        var propOptions = Ctor.options.props
        if (isUndef(propOptions)) {
            return
        }
        var res = {}
        var attrs = data.attrs
        var props = data.props
        if (isDef(attrs) || isDef(props)) {
            for (var key in propOptions) {
                var altKey = hyphenate(key)
                checkProp(res, props, key, altKey, true) ||
                    checkProp(res, attrs, key, altKey, false)
            }
        }
        return res
    }

    function checkProp(res, hash, key, altKey, preserve) {
        if (isDef(hash)) {
            if (hasOwn(hash, key)) {
                res[key] = hash[key]
                if (!preserve) {
                    delete hash[key]
                }
                return true
            } else if (hasOwn(hash, altKey)) {
                res[key] = hash[altKey]
                if (!preserve) {
                    delete hash[altKey]
                }
                return true
            }
        }
        return false
    }

    /*  */

    // The template compiler attempts to minimize the need for normalization by
    // statically analyzing the template at compile time.
    //
    // For plain HTML markup, normalization can be completely skipped because the
    // generated render function is guaranteed to return Array<VNode>. There are
    // two cases where extra normalization is needed:

    // 1. When the children contains components - because a functional component
    // may return an Array instead of a single root. In this case, just a simple
    // normalization is needed - if any child is an Array, we flatten the whole
    // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
    // because functional components already normalize their own children.
    function simpleNormalizeChildren(children) {
        for (var i = 0; i < children.length; i++) {
            if (Array.isArray(children[i])) {
                return Array.prototype.concat.apply([], children)
            }
        }
        return children
    }

    // 2. When the children contains constructs that always generated nested Arrays,
    // e.g. <template>, <slot>, v-for, or when the children is provided by user
    // with hand-written render functions / JSX. In such cases a full normalization
    // is needed to cater to all possible types of children values.
    function normalizeChildren(children) {
        return isPrimitive(children)
            ? [createTextVNode(children)]
            : Array.isArray(children)
                ? normalizeArrayChildren(children)
                : undefined
    }

    function isTextNode(node) {
        return isDef(node) && isDef(node.text) && isFalse(node.isComment)
    }

    function normalizeArrayChildren(children, nestedIndex) {
        var res = []
        var i, c, last
        for (i = 0; i < children.length; i++) {
            c = children[i]
            if (isUndef(c) || typeof c === "boolean") {
                continue
            }
            last = res[res.length - 1]
            //  nested
            if (Array.isArray(c)) {
                res.push.apply(res, normalizeArrayChildren(c, (nestedIndex || "") + "_" + i))
            } else if (isPrimitive(c)) {
                if (isTextNode(last)) {
                    // merge adjacent text nodes
                    // this is necessary for SSR hydration because text nodes are
                    // essentially merged when rendered to HTML strings
                    last.text += String(c)
                } else if (c !== "") {
                    // convert primitive to vnode
                    res.push(createTextVNode(c))
                }
            } else {
                if (isTextNode(c) && isTextNode(last)) {
                    // merge adjacent text nodes
                    res[res.length - 1] = createTextVNode(last.text + c.text)
                } else {
                    // default key for nested array children (likely generated by v-for)
                    if (
                        isTrue(children._isVList) &&
                        isDef(c.tag) &&
                        isUndef(c.key) &&
                        isDef(nestedIndex)
                    ) {
                        c.key = "__vlist" + nestedIndex + "_" + i + "__"
                    }
                    res.push(c)
                }
            }
        }
        return res
    }

    /*  */

    function ensureCtor(comp, base) {
        if (comp.__esModule && comp.default) {
            comp = comp.default
        }
        return isObject(comp) ? base.extend(comp) : comp
    }

    function createAsyncPlaceholder(factory, data, context, children, tag) {
        var node = createEmptyVNode()
        node.asyncFactory = factory
        node.asyncMeta = {
            data: data,
            context: context,
            children: children,
            tag: tag
        }
        return node
    }

    function resolveAsyncComponent(factory, baseCtor, context) {
        if (isTrue(factory.error) && isDef(factory.errorComp)) {
            return factory.errorComp
        }

        if (isDef(factory.resolved)) {
            return factory.resolved
        }

        if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
            return factory.loadingComp
        }

        if (isDef(factory.contexts)) {
            // already pending
            factory.contexts.push(context)
        } else {
            var contexts = (factory.contexts = [context])
            var sync = true

            var forceRender = function() {
                for (var i = 0, l = contexts.length; i < l; i++) {
                    contexts[i].$forceUpdate()
                }
            }

            var resolve = once(function(res) {
                // cache resolved
                factory.resolved = ensureCtor(res, baseCtor)
                // invoke callbacks only if this is not a synchronous resolve
                // (async resolves are shimmed as synchronous during SSR)
                if (!sync) {
                    forceRender()
                }
            })

            var reject = once(function(reason) {
                 false &&
                    false
                if (isDef(factory.errorComp)) {
                    factory.error = true
                    forceRender()
                }
            })

            var res = factory(resolve, reject)

            if (isObject(res)) {
                if (typeof res.then === "function") {
                    // () => Promise
                    if (isUndef(factory.resolved)) {
                        res.then(resolve, reject)
                    }
                } else if (isDef(res.component) && typeof res.component.then === "function") {
                    res.component.then(resolve, reject)

                    if (isDef(res.error)) {
                        factory.errorComp = ensureCtor(res.error, baseCtor)
                    }

                    if (isDef(res.loading)) {
                        factory.loadingComp = ensureCtor(res.loading, baseCtor)
                        if (res.delay === 0) {
                            factory.loading = true
                        } else {
                            setTimeout(function() {
                                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                    factory.loading = true
                                    forceRender()
                                }
                            }, res.delay || 200)
                        }
                    }

                    if (isDef(res.timeout)) {
                        setTimeout(function() {
                            if (isUndef(factory.resolved)) {
                                reject(null)
                            }
                        }, res.timeout)
                    }
                }
            }

            sync = false
            // return in case resolved synchronously
            return factory.loading ? factory.loadingComp : factory.resolved
        }
    }

    /*  */

    function getFirstComponentChild(children) {
        if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
                var c = children[i]
                if (isDef(c) && isDef(c.componentOptions)) {
                    return c
                }
            }
        }
    }

    /*  */

    /*  */

    function initEvents(vm) {
        vm._events = Object.create(null)
        vm._hasHookEvent = false
        // init parent attached events
        var listeners = vm.$options._parentListeners
        if (listeners) {
            updateComponentListeners(vm, listeners)
        }
    }

    var target

    function add(event, fn, once$$1) {
        if (once$$1) {
            target.$once(event, fn)
        } else {
            target.$on(event, fn)
        }
    }

    function remove$1(event, fn) {
        target.$off(event, fn)
    }

    function updateComponentListeners(vm, listeners, oldListeners) {
        target = vm
        updateListeners(listeners, oldListeners || {}, add, remove$1, vm)
    }

    function eventsMixin(Vue) {
        var hookRE = /^hook:/
        Vue.prototype.$on = function(event, fn) {
            var this$1 = this

            var vm = this
            if (Array.isArray(event)) {
                for (var i = 0, l = event.length; i < l; i++) {
                    this$1.$on(event[i], fn)
                }
            } else {
                ;(vm._events[event] || (vm._events[event] = [])).push(fn)
                // optimize hook:event cost by using a boolean flag marked at registration
                // instead of a hash lookup
                if (hookRE.test(event)) {
                    vm._hasHookEvent = true
                }
            }
            return vm
        }

        Vue.prototype.$once = function(event, fn) {
            var vm = this

            function on() {
                vm.$off(event, on)
                fn.apply(vm, arguments)
            }
            on.fn = fn
            vm.$on(event, on)
            return vm
        }

        Vue.prototype.$off = function(event, fn) {
            var this$1 = this

            var vm = this
            // all
            if (!arguments.length) {
                vm._events = Object.create(null)
                return vm
            }
            // array of events
            if (Array.isArray(event)) {
                for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
                    this$1.$off(event[i$1], fn)
                }
                return vm
            }
            // specific event
            var cbs = vm._events[event]
            if (!cbs) {
                return vm
            }
            if (arguments.length === 1) {
                vm._events[event] = null
                return vm
            }
            // specific handler
            var cb
            var i = cbs.length
            while (i--) {
                cb = cbs[i]
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i, 1)
                    break
                }
            }
            return vm
        }

        Vue.prototype.$emit = function(event) {
            var vm = this
            var cbs = vm._events[event]
            if (cbs) {
                cbs = cbs.length > 1 ? toArray(cbs) : cbs
                var args = toArray(arguments, 1)
                for (var i = 0, l = cbs.length; i < l; i++) {
                    try {
                        cbs[i].apply(vm, args)
                    } catch (e) {
                        handleError(e, vm, 'event handler for "' + event + '"')
                    }
                }
            }
            return vm
        }
    }

    /*  */

    /**
     * Runtime helper for resolving raw children VNodes into a slot object.
     */
    function resolveSlots(children, context) {
        var slots = {}
        if (!children) {
            return slots
        }
        var defaultSlot = []
        for (var i = 0, l = children.length; i < l; i++) {
            var child = children[i]
            // named slots should only be respected if the vnode was rendered in the
            // same context.
            if (
                (child.context === context || child.functionalContext === context) &&
                child.data &&
                child.data.slot != null
            ) {
                var name = child.data.slot
                var slot = slots[name] || (slots[name] = [])
                if (child.tag === "template") {
                    slot.push.apply(slot, child.children)
                } else {
                    slot.push(child)
                }
            } else {
                defaultSlot.push(child)
            }
        }
        // ignore whitespace
        if (!defaultSlot.every(isWhitespace)) {
            slots.default = defaultSlot
        }
        return slots
    }

    function isWhitespace(node) {
        return node.isComment || node.text === " "
    }

    function resolveScopedSlots(
        fns, // see flow/vnode
        res
    ) {
        res = res || {}
        for (var i = 0; i < fns.length; i++) {
            if (Array.isArray(fns[i])) {
                resolveScopedSlots(fns[i], res)
            } else {
                res[fns[i].key] = fns[i].fn
            }
        }
        return res
    }

    /*  */

    var activeInstance = null

    function initLifecycle(vm) {
        var options = vm.$options

        // locate first non-abstract parent
        var parent = options.parent
        if (parent && !options.abstract) {
            while (parent.$options.abstract && parent.$parent) {
                parent = parent.$parent
            }
            parent.$children.push(vm)
        }

        vm.$parent = parent
        vm.$root = parent ? parent.$root : vm

        vm.$children = []
        vm.$refs = {}

        vm._watcher = null
        vm._inactive = null
        vm._directInactive = false
        vm._isMounted = false
        vm._isDestroyed = false
        vm._isBeingDestroyed = false
    }

    function lifecycleMixin(Vue) {
        Vue.prototype._update = function(vnode, hydrating) {
            var vm = this
            if (vm._isMounted) {
                callHook(vm, "beforeUpdate")
            }
            var prevEl = vm.$el
            var prevVnode = vm._vnode
            var prevActiveInstance = activeInstance
            activeInstance = vm
            vm._vnode = vnode
            // Vue.prototype.__patch__ is injected in entry points
            // based on the rendering backend used.
            if (!prevVnode) {
                // initial render
                vm.$el = vm.__patch__(
                    vm.$el,
                    vnode,
                    hydrating,
                    false /* removeOnly */,
                    vm.$options._parentElm,
                    vm.$options._refElm
                )
                // no need for the ref nodes after initial patch
                // this prevents keeping a detached DOM tree in memory (#5851)
                vm.$options._parentElm = vm.$options._refElm = null
            } else {
                // updates
                vm.$el = vm.__patch__(prevVnode, vnode)
            }
            activeInstance = prevActiveInstance
            // update __vue__ reference
            if (prevEl) {
                prevEl.__vue__ = null
            }
            if (vm.$el) {
                vm.$el.__vue__ = vm
            }
            // if parent is an HOC, update its $el as well
            if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
                vm.$parent.$el = vm.$el
            }
            // updated hook is called by the scheduler to ensure that children are
            // updated in a parent's updated hook.
        }

        Vue.prototype.$forceUpdate = function() {
            var vm = this
            if (vm._watcher) {
                vm._watcher.update()
            }
        }

        Vue.prototype.$destroy = function() {
            var vm = this
            if (vm._isBeingDestroyed) {
                return
            }
            callHook(vm, "beforeDestroy")
            vm._isBeingDestroyed = true
            // remove self from parent
            var parent = vm.$parent
            if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
                remove(parent.$children, vm)
            }
            // teardown watchers
            if (vm._watcher) {
                vm._watcher.teardown()
            }
            var i = vm._watchers.length
            while (i--) {
                vm._watchers[i].teardown()
            }
            // remove reference from data ob
            // frozen object may not have observer.
            if (vm._data.__ob__) {
                vm._data.__ob__.vmCount--
            }
            // call the last hook...
            vm._isDestroyed = true
            // invoke destroy hooks on current rendered tree
            vm.__patch__(vm._vnode, null)
            // fire destroyed hook
            callHook(vm, "destroyed")
            // turn off all instance listeners.
            vm.$off()
            // remove __vue__ reference
            if (vm.$el) {
                vm.$el.__vue__ = null
            }
        }
    }

    function mountComponent(vm, el, hydrating) {
        vm.$el = el
        if (!vm.$options.render) {
            vm.$options.render = createEmptyVNode
        }
        callHook(vm, "beforeMount")

        var updateComponent
        /* istanbul ignore if */
        if (false) {} else {
            updateComponent = function() {
                vm._update(vm._render(), hydrating)
            }
        }

        vm._watcher = new Watcher(vm, updateComponent, noop)
        hydrating = false

        // manually mounted instance, call mounted on self
        // mounted is called for render-created child components in its inserted hook
        if (vm.$vnode == null) {
            vm._isMounted = true
            callHook(vm, "mounted")
        }
        return vm
    }

    function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
        var hasChildren = !!(
            renderChildren || // has new static slots
            vm.$options._renderChildren || // has old static slots
            parentVnode.data.scopedSlots || // has new scoped slots
            vm.$scopedSlots !== emptyObject
        ) // has old scoped slots

        vm.$options._parentVnode = parentVnode
        vm.$vnode = parentVnode // update vm's placeholder node without re-render

        if (vm._vnode) {
            // update child tree's parent
            vm._vnode.parent = parentVnode
        }
        vm.$options._renderChildren = renderChildren

        // update $attrs and $listensers hash
        // these are also reactive so they may trigger child update if the child
        // used them during render
        vm.$attrs = parentVnode.data && parentVnode.data.attrs
        vm.$listeners = listeners

        // update props
        if (propsData && vm.$options.props) {
            observerState.shouldConvert = false
            var props = vm._props
            var propKeys = vm.$options._propKeys || []
            for (var i = 0; i < propKeys.length; i++) {
                var key = propKeys[i]
                props[key] = validateProp(key, vm.$options.props, propsData, vm)
            }
            observerState.shouldConvert = true
            // keep a copy of raw propsData
            vm.$options.propsData = propsData
        }

        // update listeners
        if (listeners) {
            var oldListeners = vm.$options._parentListeners
            vm.$options._parentListeners = listeners
            updateComponentListeners(vm, listeners, oldListeners)
        }
        // resolve slots + force update if has children
        if (hasChildren) {
            vm.$slots = resolveSlots(renderChildren, parentVnode.context)
            vm.$forceUpdate()
        }
    }

    function isInInactiveTree(vm) {
        while (vm && (vm = vm.$parent)) {
            if (vm._inactive) {
                return true
            }
        }
        return false
    }

    function activateChildComponent(vm, direct) {
        if (direct) {
            vm._directInactive = false
            if (isInInactiveTree(vm)) {
                return
            }
        } else if (vm._directInactive) {
            return
        }
        if (vm._inactive || vm._inactive === null) {
            vm._inactive = false
            for (var i = 0; i < vm.$children.length; i++) {
                activateChildComponent(vm.$children[i])
            }
            callHook(vm, "activated")
        }
    }

    function deactivateChildComponent(vm, direct) {
        if (direct) {
            vm._directInactive = true
            if (isInInactiveTree(vm)) {
                return
            }
        }
        if (!vm._inactive) {
            vm._inactive = true
            for (var i = 0; i < vm.$children.length; i++) {
                deactivateChildComponent(vm.$children[i])
            }
            callHook(vm, "deactivated")
        }
    }

    function callHook(vm, hook) {
        var handlers = vm.$options[hook]
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                try {
                    handlers[i].call(vm)
                } catch (e) {
                    handleError(e, vm, hook + " hook")
                }
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit("hook:" + hook)
        }
    }

    /*  */

    var MAX_UPDATE_COUNT = 100

    var queue = []
    var activatedChildren = []
    var has = {}
    var circular = {}
    var waiting = false
    var flushing = false
    var index = 0

    /**
     * Reset the scheduler's state.
     */
    function resetSchedulerState() {
        index = queue.length = activatedChildren.length = 0
        has = {}
        waiting = flushing = false
    }

    /**
     * Flush both queues and run the watchers.
     */
    function flushSchedulerQueue() {
        flushing = true
        var watcher, id

        // Sort queue before flush.
        // This ensures that:
        // 1. Components are updated from parent to child. (because parent is always
        //    created before the child)
        // 2. A component's user watchers are run before its render watcher (because
        //    user watchers are created before the render watcher)
        // 3. If a component is destroyed during a parent component's watcher run,
        //    its watchers can be skipped.
        queue.sort(function(a, b) {
            return a.id - b.id
        })

        // do not cache length because more watchers might be pushed
        // as we run existing watchers
        for (index = 0; index < queue.length; index++) {
            watcher = queue[index]
            id = watcher.id
            has[id] = null
            watcher.run()
            // in dev build, check and stop circular updates.
            if (false) {}
        }

        // keep copies of post queues before resetting state
        var activatedQueue = activatedChildren.slice()
        var updatedQueue = queue.slice()

        resetSchedulerState()

        // call component updated and activated hooks
        callActivatedHooks(activatedQueue)
        callUpdatedHooks(updatedQueue)

        // devtool hook
        /* istanbul ignore if */
        if (devtools && config.devtools) {
            devtools.emit("flush")
        }
    }

    function callUpdatedHooks(queue) {
        var i = queue.length
        while (i--) {
            var watcher = queue[i]
            var vm = watcher.vm
            if (vm._watcher === watcher && vm._isMounted) {
                callHook(vm, "updated")
            }
        }
    }

    /**
     * Queue a kept-alive component that was activated during patch.
     * The queue will be processed after the entire tree has been patched.
     */
    function queueActivatedComponent(vm) {
        // setting _inactive to false here so that a render function can
        // rely on checking whether it's in an inactive tree (e.g. router-view)
        vm._inactive = false
        activatedChildren.push(vm)
    }

    function callActivatedHooks(queue) {
        for (var i = 0; i < queue.length; i++) {
            queue[i]._inactive = true
            activateChildComponent(queue[i], true /* true */)
        }
    }

    /**
     * Push a watcher into the watcher queue.
     * Jobs with duplicate IDs will be skipped unless it's
     * pushed when the queue is being flushed.
     */
    function queueWatcher(watcher) {
        var id = watcher.id
        if (has[id] == null) {
            has[id] = true
            if (!flushing) {
                queue.push(watcher)
            } else {
                // if already flushing, splice the watcher based on its id
                // if already past its id, it will be run next immediately.
                var i = queue.length - 1
                while (i > index && queue[i].id > watcher.id) {
                    i--
                }
                queue.splice(i + 1, 0, watcher)
            }
            // queue the flush
            if (!waiting) {
                waiting = true
                nextTick(flushSchedulerQueue)
            }
        }
    }

    /*  */

    var uid$2 = 0

    /**
     * A watcher parses an expression, collects dependencies,
     * and fires callback when the expression value changes.
     * This is used for both the $watch() api and directives.
     */
    var Watcher = function Watcher(vm, expOrFn, cb, options) {
        this.vm = vm
        vm._watchers.push(this)
        // options
        if (options) {
            this.deep = !!options.deep
            this.user = !!options.user
            this.lazy = !!options.lazy
            this.sync = !!options.sync
        } else {
            this.deep = this.user = this.lazy = this.sync = false
        }
        this.cb = cb
        this.id = ++uid$2 // uid for batching
        this.active = true
        this.dirty = this.lazy // for lazy watchers
        this.deps = []
        this.newDeps = []
        this.depIds = new _Set()
        this.newDepIds = new _Set()
        this.expression = ""
        // parse expression for getter
        if (typeof expOrFn === "function") {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
            if (!this.getter) {
                this.getter = function() {}
                 false &&
                    false
            }
        }
        this.value = this.lazy ? undefined : this.get()
    }

    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    Watcher.prototype.get = function get() {
        pushTarget(this)
        var value
        var vm = this.vm
        try {
            value = this.getter.call(vm, vm)
        } catch (e) {
            if (this.user) {
                handleError(e, vm, 'getter for watcher "' + this.expression + '"')
            } else {
                throw e
            }
        } finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
                traverse(value)
            }
            popTarget()
            this.cleanupDeps()
        }
        return value
    }

    /**
     * Add a dependency to this directive.
     */
    Watcher.prototype.addDep = function addDep(dep) {
        var id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    /**
     * Clean up for dependency collection.
     */
    Watcher.prototype.cleanupDeps = function cleanupDeps() {
        var this$1 = this

        var i = this.deps.length
        while (i--) {
            var dep = this$1.deps[i]
            if (!this$1.newDepIds.has(dep.id)) {
                dep.removeSub(this$1)
            }
        }
        var tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }

    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    Watcher.prototype.update = function update() {
        /* istanbul ignore else */
        if (this.lazy) {
            this.dirty = true
        } else if (this.sync) {
            this.run()
        } else {
            queueWatcher(this)
        }
    }

    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    Watcher.prototype.run = function run() {
        if (this.active) {
            var value = this.get()
            if (
                value !== this.value ||
                // Deep watchers and watchers on Object/Arrays should fire even
                // when the value is the same, because the value may
                // have mutated.
                isObject(value) ||
                this.deep
            ) {
                // set new value
                var oldValue = this.value
                this.value = value
                if (this.user) {
                    try {
                        this.cb.call(this.vm, value, oldValue)
                    } catch (e) {
                        handleError(e, this.vm, 'callback for watcher "' + this.expression + '"')
                    }
                } else {
                    this.cb.call(this.vm, value, oldValue)
                }
            }
        }
    }

    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */
    Watcher.prototype.evaluate = function evaluate() {
        this.value = this.get()
        this.dirty = false
    }

    /**
     * Depend on all deps collected by this watcher.
     */
    Watcher.prototype.depend = function depend() {
        var this$1 = this

        var i = this.deps.length
        while (i--) {
            this$1.deps[i].depend()
        }
    }

    /**
     * Remove self from all dependencies' subscriber list.
     */
    Watcher.prototype.teardown = function teardown() {
        var this$1 = this

        if (this.active) {
            // remove self from vm's watcher list
            // this is a somewhat expensive operation so we skip it
            // if the vm is being destroyed.
            if (!this.vm._isBeingDestroyed) {
                remove(this.vm._watchers, this)
            }
            var i = this.deps.length
            while (i--) {
                this$1.deps[i].removeSub(this$1)
            }
            this.active = false
        }
    }

    /**
     * Recursively traverse an object to evoke all converted
     * getters, so that every nested property inside the object
     * is collected as a "deep" dependency.
     */
    var seenObjects = new _Set()

    function traverse(val) {
        seenObjects.clear()
        _traverse(val, seenObjects)
    }

    function _traverse(val, seen) {
        var i, keys
        var isA = Array.isArray(val)
        if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
            return
        }
        if (val.__ob__) {
            var depId = val.__ob__.dep.id
            if (seen.has(depId)) {
                return
            }
            seen.add(depId)
        }
        if (isA) {
            i = val.length
            while (i--) {
                _traverse(val[i], seen)
            }
        } else {
            keys = Object.keys(val)
            i = keys.length
            while (i--) {
                _traverse(val[keys[i]], seen)
            }
        }
    }

    /*  */

    var sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: noop,
        set: noop
    }

    function proxy(target, sourceKey, key) {
        sharedPropertyDefinition.get = function proxyGetter() {
            return this[sourceKey][key]
        }
        sharedPropertyDefinition.set = function proxySetter(val) {
            this[sourceKey][key] = val
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
    }

    function initState(vm) {
        vm._watchers = []
        var opts = vm.$options
        if (opts.props) {
            initProps(vm, opts.props)
        }
        if (opts.methods) {
            initMethods(vm, opts.methods)
        }
        if (opts.data) {
            initData(vm)
        } else {
            observe((vm._data = {}), true /* asRootData */)
        }
        if (opts.computed) {
            initComputed(vm, opts.computed)
        }
        if (opts.watch && opts.watch !== nativeWatch) {
            initWatch(vm, opts.watch)
        }
    }

    function checkOptionType(vm, name) {
        var option = vm.$options[name]
        if (!isPlainObject(option)) {
            warn('component option "' + name + '" should be an object.', vm)
        }
    }

    function initProps(vm, propsOptions) {
        var propsData = vm.$options.propsData || {}
        var props = (vm._props = {})
        // cache prop keys so that future props updates can iterate using Array
        // instead of dynamic object key enumeration.
        var keys = (vm.$options._propKeys = [])
        var isRoot = !vm.$parent
        // root instance props should be converted
        observerState.shouldConvert = isRoot
        var loop = function(key) {
            keys.push(key)
            var value = validateProp(key, propsOptions, propsData, vm)
            /* istanbul ignore else */
            {
                defineReactive$$1(props, key, value)
            }
            // static props are already proxied on the component's prototype
            // during Vue.extend(). We only need to proxy props defined at
            // instantiation here.
            if (!(key in vm)) {
                proxy(vm, "_props", key)
            }
        }

        for (var key in propsOptions) loop(key)
        observerState.shouldConvert = true
    }

    function initData(vm) {
        var data = vm.$options.data
        data = vm._data = typeof data === "function" ? getData(data, vm) : data || {}
        if (!isPlainObject(data)) {
            data = {}
             false &&
                false
        }
        // proxy data on instance
        var keys = Object.keys(data)
        var props = vm.$options.props
        var methods = vm.$options.methods
        var i = keys.length
        while (i--) {
            var key = keys[i]
            if (props && hasOwn(props, key)) {
                 false &&
                    false
            } else if (!isReserved(key)) {
                proxy(vm, "_data", key)
            }
        }
        // observe data
        observe(data, true /* asRootData */)
    }

    function getData(data, vm) {
        try {
            return data.call(vm)
        } catch (e) {
            handleError(e, vm, "data()")
            return {}
        }
    }

    var computedWatcherOptions = {
        lazy: true
    }

    function initComputed(vm, computed) {
         false && false
        var watchers = (vm._computedWatchers = Object.create(null))

        for (var key in computed) {
            var userDef = computed[key]
            var getter = typeof userDef === "function" ? userDef : userDef.get
            watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

            // component-defined computed properties are already defined on the
            // component prototype. We only need to define computed properties defined
            // at instantiation here.
            if (!(key in vm)) {
                defineComputed(vm, key, userDef)
            } else {
            }
        }
    }

    function defineComputed(target, key, userDef) {
        if (typeof userDef === "function") {
            sharedPropertyDefinition.get = createComputedGetter(key)
            sharedPropertyDefinition.set = noop
        } else {
            sharedPropertyDefinition.get = userDef.get
                ? userDef.cache !== false
                    ? createComputedGetter(key)
                    : userDef.get
                : noop
            sharedPropertyDefinition.set = userDef.set ? userDef.set : noop
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
    }

    function createComputedGetter(key) {
        return function computedGetter() {
            var watcher = this._computedWatchers && this._computedWatchers[key]
            if (watcher) {
                if (watcher.dirty) {
                    watcher.evaluate()
                }
                if (Dep.target) {
                    watcher.depend()
                }
                return watcher.value
            }
        }
    }

    function initMethods(vm, methods) {
         false && false
        var props = vm.$options.props
        for (var key in methods) {
            vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
        }
    }

    function initWatch(vm, watch) {
         false && false
        for (var key in watch) {
            var handler = watch[key]
            if (Array.isArray(handler)) {
                for (var i = 0; i < handler.length; i++) {
                    createWatcher(vm, key, handler[i])
                }
            } else {
                createWatcher(vm, key, handler)
            }
        }
    }

    function createWatcher(vm, keyOrFn, handler, options) {
        if (isPlainObject(handler)) {
            options = handler
            handler = handler.handler
        }
        if (typeof handler === "string") {
            handler = vm[handler]
        }
        return vm.$watch(keyOrFn, handler, options)
    }

    function stateMixin(Vue) {
        // flow somehow has problems with directly declared definition object
        // when using Object.defineProperty, so we have to procedurally build up
        // the object here.
        var dataDef = {}
        dataDef.get = function() {
            return this._data
        }
        var propsDef = {}
        propsDef.get = function() {
            return this._props
        }
        Object.defineProperty(Vue.prototype, "$data", dataDef)
        Object.defineProperty(Vue.prototype, "$props", propsDef)

        Vue.prototype.$set = set
        Vue.prototype.$delete = del

        Vue.prototype.$watch = function(expOrFn, cb, options) {
            var vm = this
            if (isPlainObject(cb)) {
                return createWatcher(vm, expOrFn, cb, options)
            }
            options = options || {}
            options.user = true
            var watcher = new Watcher(vm, expOrFn, cb, options)
            if (options.immediate) {
                cb.call(vm, watcher.value)
            }
            return function unwatchFn() {
                watcher.teardown()
            }
        }
    }

    /*  */

    function initProvide(vm) {
        var provide = vm.$options.provide
        if (provide) {
            vm._provided = typeof provide === "function" ? provide.call(vm) : provide
        }
    }

    function initInjections(vm) {
        var result = resolveInject(vm.$options.inject, vm)
        if (result) {
            observerState.shouldConvert = false
            Object.keys(result).forEach(function(key) {
                /* istanbul ignore else */
                {
                    defineReactive$$1(vm, key, result[key])
                }
            })
            observerState.shouldConvert = true
        }
    }

    function resolveInject(inject, vm) {
        if (inject) {
            // inject is :any because flow is not smart enough to figure out cached
            var result = Object.create(null)
            var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject)

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]
                var provideKey = inject[key]
                var source = vm
                while (source) {
                    if (source._provided && provideKey in source._provided) {
                        result[key] = source._provided[provideKey]
                        break
                    }
                    source = source.$parent
                }
                if (false) {}
            }
            return result
        }
    }

    /*  */

    function createFunctionalComponent(Ctor, propsData, data, context, children) {
        var props = {}
        var propOptions = Ctor.options.props
        if (isDef(propOptions)) {
            for (var key in propOptions) {
                props[key] = validateProp(key, propOptions, propsData || {})
            }
        } else {
            if (isDef(data.attrs)) {
                mergeProps(props, data.attrs)
            }
            if (isDef(data.props)) {
                mergeProps(props, data.props)
            }
        }
        // ensure the createElement function in functional components
        // gets a unique context - this is necessary for correct named slot check
        var _context = Object.create(context)
        var h = function(a, b, c, d) {
            return createElement(_context, a, b, c, d, true)
        }
        var vnode = Ctor.options.render.call(null, h, {
            data: data,
            props: props,
            children: children,
            parent: context,
            listeners: data.on || {},
            injections: resolveInject(Ctor.options.inject, context),
            slots: function() {
                return resolveSlots(children, context)
            }
        })
        if (vnode instanceof VNode) {
            vnode.functionalContext = context
            vnode.functionalOptions = Ctor.options
            if (data.slot) {
                ;(vnode.data || (vnode.data = {})).slot = data.slot
            }
        }
        return vnode
    }

    function mergeProps(to, from) {
        for (var key in from) {
            to[camelize(key)] = from[key]
        }
    }

    /*  */

    // hooks to be invoked on component VNodes during patch
    var componentVNodeHooks = {
        init: function init(vnode, hydrating, parentElm, refElm) {
            if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
                var child = (vnode.componentInstance = createComponentInstanceForVnode(
                    vnode,
                    activeInstance,
                    parentElm,
                    refElm
                ))
                child.$mount(hydrating ? vnode.elm : undefined, hydrating)
            } else if (vnode.data.keepAlive) {
                // kept-alive components, treat as a patch
                var mountedNode = vnode // work around flow
                componentVNodeHooks.prepatch(mountedNode, mountedNode)
            }
        },

        prepatch: function prepatch(oldVnode, vnode) {
            var options = vnode.componentOptions
            var child = (vnode.componentInstance = oldVnode.componentInstance)
            updateChildComponent(
                child,
                options.propsData, // updated props
                options.listeners, // updated listeners
                vnode, // new parent vnode
                options.children // new children
            )
        },

        insert: function insert(vnode) {
            var context = vnode.context
            var componentInstance = vnode.componentInstance

            if (!componentInstance._isMounted) {
                componentInstance._isMounted = true
                callHook(componentInstance, "mounted")
            }
            if (vnode.data.keepAlive) {
                if (context._isMounted) {
                    // vue-router#1212
                    // During updates, a kept-alive component's child components may
                    // change, so directly walking the tree here may call activated hooks
                    // on incorrect children. Instead we push them into a queue which will
                    // be processed after the whole patch process ended.
                    queueActivatedComponent(componentInstance)
                } else {
                    activateChildComponent(componentInstance, true /* direct */)
                }
            }
        },

        destroy: function destroy(vnode) {
            var componentInstance = vnode.componentInstance
            if (!componentInstance._isDestroyed) {
                if (!vnode.data.keepAlive) {
                    componentInstance.$destroy()
                } else {
                    deactivateChildComponent(componentInstance, true /* direct */)
                }
            }
        }
    }

    var hooksToMerge = Object.keys(componentVNodeHooks)

    function createComponent(Ctor, data, context, children, tag) {
        if (isUndef(Ctor)) {
            return
        }

        var baseCtor = context.$options._base

        // plain options object: turn it into a constructor
        if (isObject(Ctor)) {
            Ctor = baseCtor.extend(Ctor)
        }

        // if at this stage it's not a constructor or an async component factory,
        // reject.
        if (typeof Ctor !== "function") {
            return
        }

        // async component
        var asyncFactory
        if (isUndef(Ctor.cid)) {
            asyncFactory = Ctor
            Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context)
            if (Ctor === undefined) {
                // return a placeholder node for async component, which is rendered
                // as a comment node but preserves all the raw information for the node.
                // the information will be used for async server-rendering and hydration.
                return createAsyncPlaceholder(asyncFactory, data, context, children, tag)
            }
        }

        data = data || {}

        // resolve constructor options in case global mixins are applied after
        // component constructor creation
        resolveConstructorOptions(Ctor)

        // transform component v-model data into props & events
        if (isDef(data.model)) {
            transformModel(Ctor.options, data)
        }

        // extract props
        var propsData = extractPropsFromVNodeData(data, Ctor, tag)

        // functional component
        if (isTrue(Ctor.options.functional)) {
            return createFunctionalComponent(Ctor, propsData, data, context, children)
        }

        // keep listeners
        var listeners = data.on

        if (isTrue(Ctor.options.abstract)) {
            // abstract components do not keep anything
            // other than props & listeners & slot

            // work around flow
            var slot = data.slot
            data = {}
            if (slot) {
                data.slot = slot
            }
        }

        // merge component management hooks onto the placeholder node
        mergeHooks(data)

        // return a placeholder vnode
        var name = Ctor.options.name || tag
        var vnode = new VNode(
            "vue-component-" + Ctor.cid + (name ? "-" + name : ""),
            data,
            undefined,
            undefined,
            undefined,
            context,
            {
                Ctor: Ctor,
                propsData: propsData,
                listeners: listeners,
                tag: tag,
                children: children
            },
            asyncFactory
        )
        return vnode
    }

    function createComponentInstanceForVnode(
        vnode, // we know it's MountedComponentVNode but flow doesn't
        parent, // activeInstance in lifecycle state
        parentElm,
        refElm
    ) {
        var vnodeComponentOptions = vnode.componentOptions
        var options = {
            _isComponent: true,
            parent: parent,
            propsData: vnodeComponentOptions.propsData,
            _componentTag: vnodeComponentOptions.tag,
            _parentVnode: vnode,
            _parentListeners: vnodeComponentOptions.listeners,
            _renderChildren: vnodeComponentOptions.children,
            _parentElm: parentElm || null,
            _refElm: refElm || null
        }
        // check inline-template render functions
        var inlineTemplate = vnode.data.inlineTemplate
        if (isDef(inlineTemplate)) {
            options.render = inlineTemplate.render
            options.staticRenderFns = inlineTemplate.staticRenderFns
        }
        return new vnodeComponentOptions.Ctor(options)
    }

    function mergeHooks(data) {
        if (!data.hook) {
            data.hook = {}
        }
        for (var i = 0; i < hooksToMerge.length; i++) {
            var key = hooksToMerge[i]
            var fromParent = data.hook[key]
            var ours = componentVNodeHooks[key]
            data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours
        }
    }

    function mergeHook$1(one, two) {
        return function(a, b, c, d) {
            one(a, b, c, d)
            two(a, b, c, d)
        }
    }

    // transform component v-model info (value and callback) into
    // prop and event handler respectively.
    function transformModel(options, data) {
        var prop = (options.model && options.model.prop) || "value"
        var event = (options.model && options.model.event) || "input"
        ;(data.props || (data.props = {}))[prop] = data.model.value
        var on = data.on || (data.on = {})
        if (isDef(on[event])) {
            on[event] = [data.model.callback].concat(on[event])
        } else {
            on[event] = data.model.callback
        }
    }

    /*  */

    var SIMPLE_NORMALIZE = 1
    var ALWAYS_NORMALIZE = 2

    // wrapper function for providing a more flexible interface
    // without getting yelled at by flow
    function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
        if (Array.isArray(data) || isPrimitive(data)) {
            normalizationType = children
            children = data
            data = undefined
        }
        if (isTrue(alwaysNormalize)) {
            normalizationType = ALWAYS_NORMALIZE
        }
        return _createElement(context, tag, data, children, normalizationType)
    }

    function _createElement(context, tag, data, children, normalizationType) {
        if (isDef(data) && isDef(data.__ob__)) {
             false &&
                false
            return createEmptyVNode()
        }
        // object syntax in v-bind
        if (isDef(data) && isDef(data.is)) {
            tag = data.is
        }
        if (!tag) {
            // in case of component :is set to falsy value
            return createEmptyVNode()
        }
        // warn against non-primitive key
        if (
            false
        ) {}
        // support single function children as default scoped slot
        if (Array.isArray(children) && typeof children[0] === "function") {
            data = data || {}
            data.scopedSlots = {
                default: children[0]
            }
            children.length = 0
        }
        if (normalizationType === ALWAYS_NORMALIZE) {
            children = normalizeChildren(children)
        } else if (normalizationType === SIMPLE_NORMALIZE) {
            children = simpleNormalizeChildren(children)
        }
        var vnode, ns
        if (typeof tag === "string") {
            var Ctor
            ns = config.getTagNamespace(tag)
            if (config.isReservedTag(tag)) {
                // platform built-in elements
                vnode = new VNode(
                    config.parsePlatformTagName(tag),
                    data,
                    children,
                    undefined,
                    undefined,
                    context
                )
            } else if (isDef((Ctor = resolveAsset(context.$options, "components", tag)))) {
                // component
                vnode = createComponent(Ctor, data, context, children, tag)
            } else {
                // unknown or unlisted namespaced elements
                // check at runtime because it may get assigned a namespace when its
                // parent normalizes children
                vnode = new VNode(tag, data, children, undefined, undefined, context)
            }
        } else {
            // direct component options / constructor
            vnode = createComponent(tag, data, context, children)
        }
        if (isDef(vnode)) {
            if (ns) {
                applyNS(vnode, ns)
            }
            return vnode
        } else {
            return createEmptyVNode()
        }
    }

    function applyNS(vnode, ns) {
        vnode.ns = ns
        if (vnode.tag === "foreignObject") {
            // use default namespace inside foreignObject
            return
        }
        if (isDef(vnode.children)) {
            for (var i = 0, l = vnode.children.length; i < l; i++) {
                var child = vnode.children[i]
                if (isDef(child.tag) && isUndef(child.ns)) {
                    applyNS(child, ns)
                }
            }
        }
    }

    /*  */

    /**
     * Runtime helper for rendering v-for lists.
     */
    function renderList(val, render) {
        var ret, i, l, keys, key
        if (Array.isArray(val) || typeof val === "string") {
            ret = new Array(val.length)
            for (i = 0, l = val.length; i < l; i++) {
                ret[i] = render(val[i], i)
            }
        } else if (typeof val === "number") {
            ret = new Array(val)
            for (i = 0; i < val; i++) {
                ret[i] = render(i + 1, i)
            }
        } else if (isObject(val)) {
            keys = Object.keys(val)
            ret = new Array(keys.length)
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i]
                ret[i] = render(val[key], key, i)
            }
        }
        if (isDef(ret)) {
            ret._isVList = true
        }
        return ret
    }

    /*  */

    /**
     * Runtime helper for rendering <slot>
     */
    function renderSlot(name, fallback, props, bindObject) {
        var scopedSlotFn = this.$scopedSlots[name]
        if (scopedSlotFn) {
            // scoped slot
            props = props || {}
            if (bindObject) {
                props = extend(extend({}, bindObject), props)
            }
            return scopedSlotFn(props) || fallback
        } else {
            var slotNodes = this.$slots[name]
            // warn duplicate slot usage
            if (slotNodes && "production" !== "production") {
                slotNodes._rendered &&
                    warn(
                        'Duplicate presence of slot "' +
                            name +
                            '" found in the same render tree ' +
                            "- this will likely cause render errors.",
                        this
                    )
                slotNodes._rendered = true
            }
            return slotNodes || fallback
        }
    }

    /*  */

    /**
     * Runtime helper for resolving filters
     */
    function resolveFilter(id) {
        return resolveAsset(this.$options, "filters", id, true) || identity
    }

    /*  */

    /**
     * Runtime helper for checking keyCodes from config.
     */
    function checkKeyCodes(eventKeyCode, key, builtInAlias) {
        var keyCodes = config.keyCodes[key] || builtInAlias
        if (Array.isArray(keyCodes)) {
            return keyCodes.indexOf(eventKeyCode) === -1
        } else {
            return keyCodes !== eventKeyCode
        }
    }

    /*  */

    /**
     * Runtime helper for merging v-bind="object" into a VNode's data.
     */
    function bindObjectProps(data, tag, value, asProp, isSync) {
        if (value) {
            if (!isObject(value)) {
                 false &&
                    false
            } else {
                if (Array.isArray(value)) {
                    value = toObject(value)
                }
                var hash
                var loop = function(key) {
                    if (key === "class" || key === "style" || isReservedAttribute(key)) {
                        hash = data
                    } else {
                        var type = data.attrs && data.attrs.type
                        hash =
                            asProp || config.mustUseProp(tag, type, key)
                                ? data.domProps || (data.domProps = {})
                                : data.attrs || (data.attrs = {})
                    }
                    if (!(key in hash)) {
                        hash[key] = value[key]

                        if (isSync) {
                            var on = data.on || (data.on = {})
                            on["update:" + key] = function($event) {
                                value[key] = $event
                            }
                        }
                    }
                }

                for (var key in value) loop(key)
            }
        }
        return data
    }

    /*  */

    /**
     * Runtime helper for rendering static trees.
     */
    function renderStatic(index, isInFor) {
        var tree = this._staticTrees[index]
        // if has already-rendered static tree and not inside v-for,
        // we can reuse the same tree by doing a shallow clone.
        if (tree && !isInFor) {
            return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree)
        }
        // otherwise, render a fresh tree.
        tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(
            this._renderProxy
        )
        markStatic(tree, "__static__" + index, false)
        return tree
    }

    /**
     * Runtime helper for v-once.
     * Effectively it means marking the node as static with a unique key.
     */
    function markOnce(tree, index, key) {
        markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true)
        return tree
    }

    function markStatic(tree, key, isOnce) {
        if (Array.isArray(tree)) {
            for (var i = 0; i < tree.length; i++) {
                if (tree[i] && typeof tree[i] !== "string") {
                    markStaticNode(tree[i], key + "_" + i, isOnce)
                }
            }
        } else {
            markStaticNode(tree, key, isOnce)
        }
    }

    function markStaticNode(node, key, isOnce) {
        node.isStatic = true
        node.key = key
        node.isOnce = isOnce
    }

    /*  */

    function bindObjectListeners(data, value) {
        if (value) {
            if (!isPlainObject(value)) {
                 false &&
                    false
            } else {
                var on = (data.on = data.on ? extend({}, data.on) : {})
                for (var key in value) {
                    var existing = on[key]
                    var ours = value[key]
                    on[key] = existing ? [].concat(ours, existing) : ours
                }
            }
        }
        return data
    }

    /*  */

    function initRender(vm) {
        vm._vnode = null // the root of the child tree
        vm._staticTrees = null
        var parentVnode = (vm.$vnode = vm.$options._parentVnode) // the placeholder node in parent tree
        var renderContext = parentVnode && parentVnode.context
        vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext)
        vm.$scopedSlots = emptyObject
        // bind the createElement fn to this instance
        // so that we get proper render context inside it.
        // args order: tag, data, children, normalizationType, alwaysNormalize
        // internal version is used by render functions compiled from templates
        vm._c = function(a, b, c, d) {
            return createElement(vm, a, b, c, d, false)
        }
        // normalization is always applied for the public version, used in
        // user-written render functions.
        vm.$createElement = function(a, b, c, d) {
            return createElement(vm, a, b, c, d, true)
        }

        // $attrs & $listeners are exposed for easier HOC creation.
        // they need to be reactive so that HOCs using them are always updated
        var parentData = parentVnode && parentVnode.data
        /* istanbul ignore else */
        {
            defineReactive$$1(vm, "$attrs", parentData && parentData.attrs, null, true)
            defineReactive$$1(vm, "$listeners", parentData && parentData.on, null, true)
        }
    }

    function renderMixin(Vue) {
        Vue.prototype.$nextTick = function(fn) {
            return nextTick(fn, this)
        }

        Vue.prototype._render = function() {
            var vm = this
            var ref = vm.$options
            var render = ref.render
            var staticRenderFns = ref.staticRenderFns
            var _parentVnode = ref._parentVnode

            if (vm._isMounted) {
                // clone slot nodes on re-renders
                for (var key in vm.$slots) {
                    vm.$slots[key] = cloneVNodes(vm.$slots[key])
                }
            }

            vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject

            if (staticRenderFns && !vm._staticTrees) {
                vm._staticTrees = []
            }
            // set parent vnode. this allows render functions to have access
            // to the data on the placeholder node.
            vm.$vnode = _parentVnode
            // render self
            var vnode
            try {
                vnode = render.call(vm._renderProxy, vm.$createElement)
            } catch (e) {
                handleError(e, vm, "render function")
                // return error render result,
                // or previous vnode to prevent render error causing blank component
                /* istanbul ignore else */
                {
                    vnode = vm._vnode
                }
            }
            // return empty vnode in case the render function errored out
            if (!(vnode instanceof VNode)) {
                if (false) {}
                vnode = createEmptyVNode()
            }
            // set parent
            vnode.parent = _parentVnode
            return vnode
        }

        // internal render helpers.
        // these are exposed on the instance prototype to reduce generated render
        // code size.
        Vue.prototype._o = markOnce
        Vue.prototype._n = toNumber
        Vue.prototype._s = toString
        Vue.prototype._l = renderList
        Vue.prototype._t = renderSlot
        Vue.prototype._q = looseEqual
        Vue.prototype._i = looseIndexOf
        Vue.prototype._m = renderStatic
        Vue.prototype._f = resolveFilter
        Vue.prototype._k = checkKeyCodes
        Vue.prototype._b = bindObjectProps
        Vue.prototype._v = createTextVNode
        Vue.prototype._e = createEmptyVNode
        Vue.prototype._u = resolveScopedSlots
        Vue.prototype._g = bindObjectListeners
    }

    /*  */

    var uid = 0

    function initMixin(Vue) {
        Vue.prototype._init = function(options) {
            var vm = this
            // a uid
            vm._uid = uid++

            var startTag, endTag
            /* istanbul ignore if */
            if (false) {}

            // a flag to avoid this being observed
            vm._isVue = true
            // merge options
            if (options && options._isComponent) {
                // optimize internal component instantiation
                // since dynamic options merging is pretty slow, and none of the
                // internal component options needs special treatment.
                initInternalComponent(vm, options)
            } else {
                vm.$options = mergeOptions(
                    resolveConstructorOptions(vm.constructor),
                    options || {},
                    vm
                )
            }
            /* istanbul ignore else */
            {
                vm._renderProxy = vm
            }
            // expose real self
            vm._self = vm
            initLifecycle(vm)
            initEvents(vm)
            initRender(vm)
            callHook(vm, "beforeCreate")
            initInjections(vm) // resolve injections before data/props
            initState(vm)
            initProvide(vm) // resolve provide after data/props
            callHook(vm, "created")

            /* istanbul ignore if */
            if (false) {}

            if (vm.$options.el) {
                vm.$mount(vm.$options.el)
            }
        }
    }

    function initInternalComponent(vm, options) {
        var opts = (vm.$options = Object.create(vm.constructor.options))
        // doing this because it's faster than dynamic enumeration.
        opts.parent = options.parent
        opts.propsData = options.propsData
        opts._parentVnode = options._parentVnode
        opts._parentListeners = options._parentListeners
        opts._renderChildren = options._renderChildren
        opts._componentTag = options._componentTag
        opts._parentElm = options._parentElm
        opts._refElm = options._refElm
        if (options.render) {
            opts.render = options.render
            opts.staticRenderFns = options.staticRenderFns
        }
    }

    function resolveConstructorOptions(Ctor) {
        var options = Ctor.options
        if (Ctor.super) {
            var superOptions = resolveConstructorOptions(Ctor.super)
            var cachedSuperOptions = Ctor.superOptions
            if (superOptions !== cachedSuperOptions) {
                // super option changed,
                // need to resolve new options.
                Ctor.superOptions = superOptions
                // check if there are any late-modified/attached options (#4976)
                var modifiedOptions = resolveModifiedOptions(Ctor)
                // update base extend options
                if (modifiedOptions) {
                    extend(Ctor.extendOptions, modifiedOptions)
                }
                options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
                if (options.name) {
                    options.components[options.name] = Ctor
                }
            }
        }
        return options
    }

    function resolveModifiedOptions(Ctor) {
        var modified
        var latest = Ctor.options
        var extended = Ctor.extendOptions
        var sealed = Ctor.sealedOptions
        for (var key in latest) {
            if (latest[key] !== sealed[key]) {
                if (!modified) {
                    modified = {}
                }
                modified[key] = dedupe(latest[key], extended[key], sealed[key])
            }
        }
        return modified
    }

    function dedupe(latest, extended, sealed) {
        // compare latest and sealed to ensure lifecycle hooks won't be duplicated
        // between merges
        if (Array.isArray(latest)) {
            var res = []
            sealed = Array.isArray(sealed) ? sealed : [sealed]
            extended = Array.isArray(extended) ? extended : [extended]
            for (var i = 0; i < latest.length; i++) {
                // push original options and not sealed options to exclude duplicated options
                if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
                    res.push(latest[i])
                }
            }
            return res
        } else {
            return latest
        }
    }

    function Vue$3(options) {
        if (false) {}
        this._init(options)
    }

    initMixin(Vue$3)
    stateMixin(Vue$3)
    eventsMixin(Vue$3)
    lifecycleMixin(Vue$3)
    renderMixin(Vue$3)

    /*  */

    function initUse(Vue) {
        Vue.use = function(plugin) {
            var installedPlugins = this._installedPlugins || (this._installedPlugins = [])
            if (installedPlugins.indexOf(plugin) > -1) {
                return this
            }

            // additional parameters
            var args = toArray(arguments, 1)
            args.unshift(this)
            if (typeof plugin.install === "function") {
                plugin.install.apply(plugin, args)
            } else if (typeof plugin === "function") {
                plugin.apply(null, args)
            }
            installedPlugins.push(plugin)
            return this
        }
    }

    /*  */

    function initMixin$1(Vue) {
        Vue.mixin = function(mixin) {
            this.options = mergeOptions(this.options, mixin)
            return this
        }
    }

    /*  */

    function initExtend(Vue) {
        /**
         * Each instance constructor, including Vue, has a unique
         * cid. This enables us to create wrapped "child
         * constructors" for prototypal inheritance and cache them.
         */
        Vue.cid = 0
        var cid = 1

        /**
         * Class inheritance
         */
        Vue.extend = function(extendOptions) {
            extendOptions = extendOptions || {}
            var Super = this
            var SuperId = Super.cid
            var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
            if (cachedCtors[SuperId]) {
                return cachedCtors[SuperId]
            }

            var name = extendOptions.name || Super.options.name
            var Sub = function VueComponent(options) {
                this._init(options)
            }
            Sub.prototype = Object.create(Super.prototype)
            Sub.prototype.constructor = Sub
            Sub.cid = cid++
            Sub.options = mergeOptions(Super.options, extendOptions)
            Sub["super"] = Super

            // For props and computed properties, we define the proxy getters on
            // the Vue instances at extension time, on the extended prototype. This
            // avoids Object.defineProperty calls for each instance created.
            if (Sub.options.props) {
                initProps$1(Sub)
            }
            if (Sub.options.computed) {
                initComputed$1(Sub)
            }

            // allow further extension/mixin/plugin usage
            Sub.extend = Super.extend
            Sub.mixin = Super.mixin
            Sub.use = Super.use

            // create asset registers, so extended classes
            // can have their private assets too.
            ASSET_TYPES.forEach(function(type) {
                Sub[type] = Super[type]
            })
            // enable recursive self-lookup
            if (name) {
                Sub.options.components[name] = Sub
            }

            // keep a reference to the super options at extension time.
            // later at instantiation we can check if Super's options have
            // been updated.
            Sub.superOptions = Super.options
            Sub.extendOptions = extendOptions
            Sub.sealedOptions = extend({}, Sub.options)

            // cache constructor
            cachedCtors[SuperId] = Sub
            return Sub
        }
    }

    function initProps$1(Comp) {
        var props = Comp.options.props
        for (var key in props) {
            proxy(Comp.prototype, "_props", key)
        }
    }

    function initComputed$1(Comp) {
        var computed = Comp.options.computed
        for (var key in computed) {
            defineComputed(Comp.prototype, key, computed[key])
        }
    }

    /*  */

    function initAssetRegisters(Vue) {
        /**
         * Create asset registration methods.
         */
        ASSET_TYPES.forEach(function(type) {
            Vue[type] = function(id, definition) {
                if (!definition) {
                    return this.options[type + "s"][id]
                } else {
                    /* istanbul ignore if */
                    if (type === "component" && isPlainObject(definition)) {
                        definition.name = definition.name || id
                        definition = this.options._base.extend(definition)
                    }
                    if (type === "directive" && typeof definition === "function") {
                        definition = {
                            bind: definition,
                            update: definition
                        }
                    }
                    this.options[type + "s"][id] = definition
                    return definition
                }
            }
        })
    }

    /*  */

    var patternTypes = [String, RegExp, Array]

    function getComponentName(opts) {
        return opts && (opts.Ctor.options.name || opts.tag)
    }

    function matches(pattern, name) {
        if (Array.isArray(pattern)) {
            return pattern.indexOf(name) > -1
        } else if (typeof pattern === "string") {
            return pattern.split(",").indexOf(name) > -1
        } else if (isRegExp(pattern)) {
            return pattern.test(name)
        }
        /* istanbul ignore next */
        return false
    }

    function pruneCache(cache, current, filter) {
        for (var key in cache) {
            var cachedNode = cache[key]
            if (cachedNode) {
                var name = getComponentName(cachedNode.componentOptions)
                if (name && !filter(name)) {
                    if (cachedNode !== current) {
                        pruneCacheEntry(cachedNode)
                    }
                    cache[key] = null
                }
            }
        }
    }

    function pruneCacheEntry(vnode) {
        if (vnode) {
            vnode.componentInstance.$destroy()
        }
    }

    var KeepAlive = {
        name: "keep-alive",
        abstract: true,

        props: {
            include: patternTypes,
            exclude: patternTypes
        },

        created: function created() {
            this.cache = Object.create(null)
        },

        destroyed: function destroyed() {
            var this$1 = this

            for (var key in this$1.cache) {
                pruneCacheEntry(this$1.cache[key])
            }
        },

        watch: {
            include: function include(val) {
                pruneCache(this.cache, this._vnode, function(name) {
                    return matches(val, name)
                })
            },
            exclude: function exclude(val) {
                pruneCache(this.cache, this._vnode, function(name) {
                    return !matches(val, name)
                })
            }
        },

        render: function render() {
            var vnode = getFirstComponentChild(this.$slots.default)
            var componentOptions = vnode && vnode.componentOptions
            if (componentOptions) {
                // check pattern
                var name = getComponentName(componentOptions)
                if (
                    name &&
                    ((this.include && !matches(this.include, name)) ||
                        (this.exclude && matches(this.exclude, name)))
                ) {
                    return vnode
                }
                var key =
                    vnode.key == null
                        ? // same constructor may get registered as different local components
                          // so cid alone is not enough (#3269)
                          componentOptions.Ctor.cid +
                          (componentOptions.tag ? "::" + componentOptions.tag : "")
                        : vnode.key
                if (this.cache[key]) {
                    vnode.componentInstance = this.cache[key].componentInstance
                } else {
                    this.cache[key] = vnode
                }
                vnode.data.keepAlive = true
            }
            return vnode
        }
    }

    var builtInComponents = {
        KeepAlive: KeepAlive
    }

    /*  */

    function initGlobalAPI(Vue) {
        // config
        var configDef = {}
        configDef.get = function() {
            return config
        }
        Object.defineProperty(Vue, "config", configDef)

        // exposed util methods.
        // NOTE: these are not considered part of the public API - avoid relying on
        // them unless you are aware of the risk.
        Vue.util = {
            warn: warn,
            extend: extend,
            mergeOptions: mergeOptions,
            defineReactive: defineReactive$$1
        }

        Vue.set = set
        Vue.delete = del
        Vue.nextTick = nextTick

        Vue.options = Object.create(null)
        ASSET_TYPES.forEach(function(type) {
            Vue.options[type + "s"] = Object.create(null)
        })

        // this is used to identify the "base" constructor to extend all plain-object
        // components with in Weex's multi-instance scenarios.
        Vue.options._base = Vue

        extend(Vue.options.components, builtInComponents)

        initUse(Vue)
        initMixin$1(Vue)
        initExtend(Vue)
        initAssetRegisters(Vue)
    }

    initGlobalAPI(Vue$3)

    Object.defineProperty(Vue$3.prototype, "$isServer", {
        get: isServerRendering
    })

    Object.defineProperty(Vue$3.prototype, "$ssrContext", {
        get: function get() {
            /* istanbul ignore next */
            return this.$vnode && this.$vnode.ssrContext
        }
    })

    Vue$3.version = "2.4.1"
    Vue$3.mpvueVersion = "1.0.12"

    /* globals renderer */

    var isReservedTag = makeMap(
        "template,script,style,element,content,slot,link,meta,svg,view," +
            "a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select," +
            "slider,slider-neighbor,indicator,trisition,trisition-group,canvas," +
            "list,cell,header,loading,loading-indicator,refresh,scrollable,scroller," +
            "video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown",
        true
    )

    // these are reserved for web because they are directly compiled away
    // during template compilation
    var isReservedAttr = makeMap("style,class")

    // Elements that you can, intentionally, leave open (and which close themselves)
    // more flexable than web
    var canBeLeftOpenTag = makeMap(
        "web,spinner,switch,video,textarea,canvas," + "indicator,marquee,countdown",
        true
    )

    var isUnaryTag = makeMap("embed,img,image,input,link,meta", true)

    function mustUseProp() {
        /* console.log('mustUseProp') */
    }

    function getTagNamespace() {
        /* console.log('getTagNamespace') */
    }

    function isUnknownElement() {
        /* console.log('isUnknownElement') */
    }

    function getComKey(vm) {
        return vm && vm.$attrs ? vm.$attrs["mpcomid"] : "0"
    }

    // 用于小程序的 event type 到 web 的 event
    var eventTypeMap = {
        tap: ["tap", "click"],
        touchstart: ["touchstart"],
        touchmove: ["touchmove"],
        touchcancel: ["touchcancel"],
        touchend: ["touchend"],
        longtap: ["longtap"],
        input: ["input"],
        blur: ["change", "blur"],
        submit: ["submit"],
        focus: ["focus"],
        scrolltoupper: ["scrolltoupper"],
        scrolltolower: ["scrolltolower"],
        scroll: ["scroll"]
    }

    /*  */

    // import { namespaceMap } from 'mp/util/index'

    var obj = {}

    function createElement$1(tagName, vnode) {
        return obj
    }

    function createElementNS(namespace, tagName) {
        return obj
    }

    function createTextNode(text) {
        return obj
    }

    function createComment(text) {
        return obj
    }

    function insertBefore(parentNode, newNode, referenceNode) {}

    function removeChild(node, child) {}

    function appendChild(node, child) {}

    function parentNode(node) {
        return obj
    }

    function nextSibling(node) {
        return obj
    }

    function tagName(node) {
        return "div"
    }

    function setTextContent(node, text) {
        return obj
    }

    function setAttribute(node, key, val) {
        return obj
    }

    var nodeOps = Object.freeze({
        createElement: createElement$1,
        createElementNS: createElementNS,
        createTextNode: createTextNode,
        createComment: createComment,
        insertBefore: insertBefore,
        removeChild: removeChild,
        appendChild: appendChild,
        parentNode: parentNode,
        nextSibling: nextSibling,
        tagName: tagName,
        setTextContent: setTextContent,
        setAttribute: setAttribute
    })

    /*  */

    var ref = {
        create: function create(_, vnode) {
            registerRef(vnode)
        },
        update: function update(oldVnode, vnode) {
            if (oldVnode.data.ref !== vnode.data.ref) {
                registerRef(oldVnode, true)
                registerRef(vnode)
            }
        },
        destroy: function destroy(vnode) {
            registerRef(vnode, true)
        }
    }

    function registerRef(vnode, isRemoval) {
        var key = vnode.data.ref
        if (!key) {
            return
        }

        var vm = vnode.context
        var ref = vnode.componentInstance || vnode.elm
        var refs = vm.$refs
        if (isRemoval) {
            if (Array.isArray(refs[key])) {
                remove(refs[key], ref)
            } else if (refs[key] === ref) {
                refs[key] = undefined
            }
        } else {
            if (vnode.data.refInFor) {
                if (!Array.isArray(refs[key])) {
                    refs[key] = [ref]
                } else if (refs[key].indexOf(ref) < 0) {
                    // $flow-disable-line
                    refs[key].push(ref)
                }
            } else {
                refs[key] = ref
            }
        }
    }

    /**
     * Virtual DOM patching algorithm based on Snabbdom by
     * Simon Friis Vindum (@paldepind)
     * Licensed under the MIT License
     * https://github.com/paldepind/snabbdom/blob/master/LICENSE
     *
     * modified by Evan You (@yyx990803)
     *

    /*
     * Not type-checking this because this file is perf-critical and the cost
     * of making flow understand it is not worth it.
     */

    var emptyNode = new VNode("", {}, [])

    var hooks = ["create", "activate", "update", "remove", "destroy"]

    function sameVnode(a, b) {
        return (
            a.key === b.key &&
            ((a.tag === b.tag &&
                a.isComment === b.isComment &&
                isDef(a.data) === isDef(b.data) &&
                sameInputType(a, b)) ||
                (isTrue(a.isAsyncPlaceholder) &&
                    a.asyncFactory === b.asyncFactory &&
                    isUndef(b.asyncFactory.error)))
        )
    }

    // Some browsers do not support dynamically changing type for <input>
    // so they need to be treated as different nodes
    function sameInputType(a, b) {
        if (a.tag !== "input") {
            return true
        }
        var i
        var typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type
        var typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type
        return typeA === typeB
    }

    function createKeyToOldIdx(children, beginIdx, endIdx) {
        var i, key
        var map = {}
        for (i = beginIdx; i <= endIdx; ++i) {
            key = children[i].key
            if (isDef(key)) {
                map[key] = i
            }
        }
        return map
    }

    function createPatchFunction(backend) {
        var i, j
        var cbs = {}

        var modules = backend.modules
        var nodeOps = backend.nodeOps

        for (i = 0; i < hooks.length; ++i) {
            cbs[hooks[i]] = []
            for (j = 0; j < modules.length; ++j) {
                if (isDef(modules[j][hooks[i]])) {
                    cbs[hooks[i]].push(modules[j][hooks[i]])
                }
            }
        }

        function emptyNodeAt(elm) {
            return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
        }

        function createRmCb(childElm, listeners) {
            function remove$$1() {
                if (--remove$$1.listeners === 0) {
                    removeNode(childElm)
                }
            }
            remove$$1.listeners = listeners
            return remove$$1
        }

        function removeNode(el) {
            var parent = nodeOps.parentNode(el)
            // element may have already been removed due to v-html / v-text
            if (isDef(parent)) {
                nodeOps.removeChild(parent, el)
            }
        }

        var inPre = 0

        function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
            vnode.isRootInsert = !nested // for transition enter check
            if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
                return
            }

            var data = vnode.data
            var children = vnode.children
            var tag = vnode.tag
            if (isDef(tag)) {
                vnode.elm = vnode.ns
                    ? nodeOps.createElementNS(vnode.ns, tag)
                    : nodeOps.createElement(tag, vnode)
                setScope(vnode)

                /* istanbul ignore if */
                {
                    createChildren(vnode, children, insertedVnodeQueue)
                    if (isDef(data)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue)
                    }
                    insert(parentElm, vnode.elm, refElm)
                }

                if (false) {}
            } else if (isTrue(vnode.isComment)) {
                vnode.elm = nodeOps.createComment(vnode.text)
                insert(parentElm, vnode.elm, refElm)
            } else {
                vnode.elm = nodeOps.createTextNode(vnode.text)
                insert(parentElm, vnode.elm, refElm)
            }
        }

        function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
            var i = vnode.data
            if (isDef(i)) {
                var isReactivated = isDef(vnode.componentInstance) && i.keepAlive
                if (isDef((i = i.hook)) && isDef((i = i.init))) {
                    i(vnode, false /* hydrating */, parentElm, refElm)
                }
                // after calling the init hook, if the vnode is a child component
                // it should've created a child instance and mounted it. the child
                // component also has set the placeholder vnode's elm.
                // in that case we can just return the element and be done.
                if (isDef(vnode.componentInstance)) {
                    initComponent(vnode, insertedVnodeQueue)
                    if (isTrue(isReactivated)) {
                        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
                    }
                    return true
                }
            }
        }

        function initComponent(vnode, insertedVnodeQueue) {
            if (isDef(vnode.data.pendingInsert)) {
                insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
                vnode.data.pendingInsert = null
            }
            vnode.elm = vnode.componentInstance.$el
            if (isPatchable(vnode)) {
                invokeCreateHooks(vnode, insertedVnodeQueue)
                setScope(vnode)
            } else {
                // empty component root.
                // skip all element-related modules except for ref (#3455)
                registerRef(vnode)
                // make sure to invoke the insert hook
                insertedVnodeQueue.push(vnode)
            }
        }

        function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
            var i
            // hack for #4339: a reactivated component with inner transition
            // does not trigger because the inner node's created hooks are not called
            // again. It's not ideal to involve module-specific logic in here but
            // there doesn't seem to be a better way to do it.
            var innerNode = vnode
            while (innerNode.componentInstance) {
                innerNode = innerNode.componentInstance._vnode
                if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
                    for (i = 0; i < cbs.activate.length; ++i) {
                        cbs.activate[i](emptyNode, innerNode)
                    }
                    insertedVnodeQueue.push(innerNode)
                    break
                }
            }
            // unlike a newly created component,
            // a reactivated keep-alive component doesn't insert itself
            insert(parentElm, vnode.elm, refElm)
        }

        function insert(parent, elm, ref$$1) {
            if (isDef(parent)) {
                if (isDef(ref$$1)) {
                    if (ref$$1.parentNode === parent) {
                        nodeOps.insertBefore(parent, elm, ref$$1)
                    }
                } else {
                    nodeOps.appendChild(parent, elm)
                }
            }
        }

        function createChildren(vnode, children, insertedVnodeQueue) {
            if (Array.isArray(children)) {
                for (var i = 0; i < children.length; ++i) {
                    createElm(children[i], insertedVnodeQueue, vnode.elm, null, true)
                }
            } else if (isPrimitive(vnode.text)) {
                nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
            }
        }

        function isPatchable(vnode) {
            while (vnode.componentInstance) {
                vnode = vnode.componentInstance._vnode
            }
            return isDef(vnode.tag)
        }

        function invokeCreateHooks(vnode, insertedVnodeQueue) {
            for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, vnode)
            }
            i = vnode.data.hook // Reuse variable
            if (isDef(i)) {
                if (isDef(i.create)) {
                    i.create(emptyNode, vnode)
                }
                if (isDef(i.insert)) {
                    insertedVnodeQueue.push(vnode)
                }
            }
        }

        // set scope id attribute for scoped CSS.
        // this is implemented as a special case to avoid the overhead
        // of going through the normal attribute patching process.
        function setScope(vnode) {
            var i
            var ancestor = vnode
            while (ancestor) {
                if (isDef((i = ancestor.context)) && isDef((i = i.$options._scopeId))) {
                    nodeOps.setAttribute(vnode.elm, i, "")
                }
                ancestor = ancestor.parent
            }
            // for slot content they should also get the scopeId from the host instance.
            if (
                isDef((i = activeInstance)) &&
                i !== vnode.context &&
                isDef((i = i.$options._scopeId))
            ) {
                nodeOps.setAttribute(vnode.elm, i, "")
            }
        }

        function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
            for (; startIdx <= endIdx; ++startIdx) {
                createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm)
            }
        }

        function invokeDestroyHook(vnode) {
            var i, j
            var data = vnode.data
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.destroy))) {
                    i(vnode)
                }
                for (i = 0; i < cbs.destroy.length; ++i) {
                    cbs.destroy[i](vnode)
                }
            }
            if (isDef((i = vnode.children))) {
                for (j = 0; j < vnode.children.length; ++j) {
                    invokeDestroyHook(vnode.children[j])
                }
            }
        }

        function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
            for (; startIdx <= endIdx; ++startIdx) {
                var ch = vnodes[startIdx]
                if (isDef(ch)) {
                    if (isDef(ch.tag)) {
                        removeAndInvokeRemoveHook(ch)
                        invokeDestroyHook(ch)
                    } else {
                        // Text node
                        removeNode(ch.elm)
                    }
                }
            }
        }

        function removeAndInvokeRemoveHook(vnode, rm) {
            if (isDef(rm) || isDef(vnode.data)) {
                var i
                var listeners = cbs.remove.length + 1
                if (isDef(rm)) {
                    // we have a recursively passed down rm callback
                    // increase the listeners count
                    rm.listeners += listeners
                } else {
                    // directly removing
                    rm = createRmCb(vnode.elm, listeners)
                }
                // recursively invoke hooks on child component root node
                if (
                    isDef((i = vnode.componentInstance)) &&
                    isDef((i = i._vnode)) &&
                    isDef(i.data)
                ) {
                    removeAndInvokeRemoveHook(i, rm)
                }
                for (i = 0; i < cbs.remove.length; ++i) {
                    cbs.remove[i](vnode, rm)
                }
                if (isDef((i = vnode.data.hook)) && isDef((i = i.remove))) {
                    i(vnode, rm)
                } else {
                    rm()
                }
            } else {
                removeNode(vnode.elm)
            }
        }

        function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
            var oldStartIdx = 0
            var newStartIdx = 0
            var oldEndIdx = oldCh.length - 1
            var oldStartVnode = oldCh[0]
            var oldEndVnode = oldCh[oldEndIdx]
            var newEndIdx = newCh.length - 1
            var newStartVnode = newCh[0]
            var newEndVnode = newCh[newEndIdx]
            var oldKeyToIdx, idxInOld, elmToMove, refElm

            // removeOnly is a special flag used only by <transition-group>
            // to ensure removed elements stay in correct relative positions
            // during leaving transitions
            var canMove = !removeOnly

            while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                if (isUndef(oldStartVnode)) {
                    oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
                } else if (isUndef(oldEndVnode)) {
                    oldEndVnode = oldCh[--oldEndIdx]
                } else if (sameVnode(oldStartVnode, newStartVnode)) {
                    patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
                    oldStartVnode = oldCh[++oldStartIdx]
                    newStartVnode = newCh[++newStartIdx]
                } else if (sameVnode(oldEndVnode, newEndVnode)) {
                    patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
                    oldEndVnode = oldCh[--oldEndIdx]
                    newEndVnode = newCh[--newEndIdx]
                } else if (sameVnode(oldStartVnode, newEndVnode)) {
                    // Vnode moved right
                    patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
                    canMove &&
                        nodeOps.insertBefore(
                            parentElm,
                            oldStartVnode.elm,
                            nodeOps.nextSibling(oldEndVnode.elm)
                        )
                    oldStartVnode = oldCh[++oldStartIdx]
                    newEndVnode = newCh[--newEndIdx]
                } else if (sameVnode(oldEndVnode, newStartVnode)) {
                    // Vnode moved left
                    patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
                    canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
                    oldEndVnode = oldCh[--oldEndIdx]
                    newStartVnode = newCh[++newStartIdx]
                } else {
                    if (isUndef(oldKeyToIdx)) {
                        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
                    }
                    idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
                    if (isUndef(idxInOld)) {
                        // New element
                        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
                        newStartVnode = newCh[++newStartIdx]
                    } else {
                        elmToMove = oldCh[idxInOld]
                        /* istanbul ignore if */
                        if (false) {}
                        if (sameVnode(elmToMove, newStartVnode)) {
                            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
                            oldCh[idxInOld] = undefined
                            canMove &&
                                nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm)
                            newStartVnode = newCh[++newStartIdx]
                        } else {
                            // same key but different element. treat as new element
                            createElm(
                                newStartVnode,
                                insertedVnodeQueue,
                                parentElm,
                                oldStartVnode.elm
                            )
                            newStartVnode = newCh[++newStartIdx]
                        }
                    }
                }
            }
            if (oldStartIdx > oldEndIdx) {
                refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
                addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
            } else if (newStartIdx > newEndIdx) {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
            }
        }

        function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
            if (oldVnode === vnode) {
                return
            }

            var elm = (vnode.elm = oldVnode.elm)

            if (isTrue(oldVnode.isAsyncPlaceholder)) {
                if (isDef(vnode.asyncFactory.resolved)) {
                    hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
                } else {
                    vnode.isAsyncPlaceholder = true
                }
                return
            }

            // reuse element for static trees.
            // note we only do this if the vnode is cloned -
            // if the new node is not cloned it means the render functions have been
            // reset by the hot-reload-api and we need to do a proper re-render.
            if (
                isTrue(vnode.isStatic) &&
                isTrue(oldVnode.isStatic) &&
                vnode.key === oldVnode.key &&
                (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
            ) {
                vnode.componentInstance = oldVnode.componentInstance
                return
            }

            var i
            var data = vnode.data
            if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
                i(oldVnode, vnode)
            }

            var oldCh = oldVnode.children
            var ch = vnode.children
            if (isDef(data) && isPatchable(vnode)) {
                for (i = 0; i < cbs.update.length; ++i) {
                    cbs.update[i](oldVnode, vnode)
                }
                if (isDef((i = data.hook)) && isDef((i = i.update))) {
                    i(oldVnode, vnode)
                }
            }
            if (isUndef(vnode.text)) {
                if (isDef(oldCh) && isDef(ch)) {
                    if (oldCh !== ch) {
                        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
                    }
                } else if (isDef(ch)) {
                    if (isDef(oldVnode.text)) {
                        nodeOps.setTextContent(elm, "")
                    }
                    addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
                } else if (isDef(oldCh)) {
                    removeVnodes(elm, oldCh, 0, oldCh.length - 1)
                } else if (isDef(oldVnode.text)) {
                    nodeOps.setTextContent(elm, "")
                }
            } else if (oldVnode.text !== vnode.text) {
                nodeOps.setTextContent(elm, vnode.text)
            }
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.postpatch))) {
                    i(oldVnode, vnode)
                }
            }
        }

        function invokeInsertHook(vnode, queue, initial) {
            // delay insert hooks for component root nodes, invoke them after the
            // element is really inserted
            if (isTrue(initial) && isDef(vnode.parent)) {
                vnode.parent.data.pendingInsert = queue
            } else {
                for (var i = 0; i < queue.length; ++i) {
                    queue[i].data.hook.insert(queue[i])
                }
            }
        }

        var bailed = false
        // list of modules that can skip create hook during hydration because they
        // are already rendered on the client or has no need for initialization
        var isRenderedModule = makeMap("attrs,style,class,staticClass,staticStyle,key")

        // Note: this is a browser-only function so we can assume elms are DOM nodes.
        function hydrate(elm, vnode, insertedVnodeQueue) {
            if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
                vnode.elm = elm
                vnode.isAsyncPlaceholder = true
                return true
            }
            vnode.elm = elm
            var tag = vnode.tag
            var data = vnode.data
            var children = vnode.children
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.init))) {
                    i(vnode, true /* hydrating */)
                }
                if (isDef((i = vnode.componentInstance))) {
                    // child component. it should have hydrated its own tree.
                    initComponent(vnode, insertedVnodeQueue)
                    return true
                }
            }
            if (isDef(tag)) {
                if (isDef(children)) {
                    // empty element, allow client to pick up and populate children
                    if (!elm.hasChildNodes()) {
                        createChildren(vnode, children, insertedVnodeQueue)
                    } else {
                        var childrenMatch = true
                        var childNode = elm.firstChild
                        for (var i$1 = 0; i$1 < children.length; i$1++) {
                            if (
                                !childNode ||
                                !hydrate(childNode, children[i$1], insertedVnodeQueue)
                            ) {
                                childrenMatch = false
                                break
                            }
                            childNode = childNode.nextSibling
                        }
                        // if childNode is not null, it means the actual childNodes list is
                        // longer than the virtual children list.
                        if (!childrenMatch || childNode) {
                            if (
                                false
                            ) {}
                            return false
                        }
                    }
                }
                if (isDef(data)) {
                    for (var key in data) {
                        if (!isRenderedModule(key)) {
                            invokeCreateHooks(vnode, insertedVnodeQueue)
                            break
                        }
                    }
                }
            } else if (elm.data !== vnode.text) {
                elm.data = vnode.text
            }
            return true
        }

        return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
            if (isUndef(vnode)) {
                if (isDef(oldVnode)) {
                    invokeDestroyHook(oldVnode)
                }
                return
            }

            var isInitialPatch = false
            var insertedVnodeQueue = []

            if (isUndef(oldVnode)) {
                // empty mount (likely as component), create new root element
                isInitialPatch = true
                createElm(vnode, insertedVnodeQueue, parentElm, refElm)
            } else {
                var isRealElement = isDef(oldVnode.nodeType)
                if (!isRealElement && sameVnode(oldVnode, vnode)) {
                    // patch existing root node
                    patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
                } else {
                    if (isRealElement) {
                        // mounting to a real element
                        // check if this is server-rendered content and if we can perform
                        // a successful hydration.
                        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                            oldVnode.removeAttribute(SSR_ATTR)
                            hydrating = true
                        }
                        if (isTrue(hydrating)) {
                            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                                invokeInsertHook(vnode, insertedVnodeQueue, true)
                                return oldVnode
                            } else {
                            }
                        }
                        // either not server-rendered, or hydration failed.
                        // create an empty node and replace it
                        oldVnode = emptyNodeAt(oldVnode)
                    }
                    // replacing existing element
                    var oldElm = oldVnode.elm
                    var parentElm$1 = nodeOps.parentNode(oldElm)
                    createElm(
                        vnode,
                        insertedVnodeQueue,
                        // extremely rare edge case: do not insert if old element is in a
                        // leaving transition. Only happens when combining transition +
                        // keep-alive + HOCs. (#4590)
                        oldElm._leaveCb ? null : parentElm$1,
                        nodeOps.nextSibling(oldElm)
                    )

                    if (isDef(vnode.parent)) {
                        // component root element replaced.
                        // update parent placeholder node element, recursively
                        var ancestor = vnode.parent
                        while (ancestor) {
                            ancestor.elm = vnode.elm
                            ancestor = ancestor.parent
                        }
                        if (isPatchable(vnode)) {
                            for (var i = 0; i < cbs.create.length; ++i) {
                                cbs.create[i](emptyNode, vnode.parent)
                            }
                        }
                    }

                    if (isDef(parentElm$1)) {
                        removeVnodes(parentElm$1, [oldVnode], 0, 0)
                    } else if (isDef(oldVnode.tag)) {
                        invokeDestroyHook(oldVnode)
                    }
                }
            }

            invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
            return vnode.elm
        }
    }

    /*  */

    // import baseModules from 'core/vdom/modules/index'
    // const platformModules = []
    // import platformModules from 'web/runtime/modules/index'

    // the directive module should be applied last, after all
    // built-in modules have been applied.
    // const modules = platformModules.concat(baseModules)
    var modules = [ref]

    var corePatch = createPatchFunction({
        nodeOps: nodeOps,
        modules: modules
    })

    function patch() {
        corePatch.apply(this, arguments)
        this.$updateDataToMP()
    }

    function callHook$1(vm, hook, params) {
        var handlers = vm.$options[hook]
        if (hook === "onError" && handlers) {
            handlers = [handlers]
        }

        var ret
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                try {
                    ret = handlers[i].call(vm, params)
                } catch (e) {
                    handleError(e, vm, hook + " hook")
                }
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit("hook:" + hook)
        }

        // for child
        if (vm.$children.length) {
            vm.$children.forEach(function(v) {
                return callHook$1(v, hook, params)
            })
        }

        return ret
    }

    // mpType 小程序实例的类型，可能的值是 'app', 'page'
    // rootVueVM 是 vue 的根组件实例，子组件中访问 this.$root 可得
    function getGlobalData(app, rootVueVM) {
        var mp = rootVueVM.$mp
        if (app && app.globalData) {
            mp.appOptions = app.globalData.appOptions
        }
    }

    // 格式化 properties 属性，并给每个属性加上 observer 方法

    // properties 的 一些类型 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
    // properties: {
    //   paramA: Number,
    //   myProperty: { // 属性名
    //     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    //     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
    //     observer: function(newVal, oldVal, changedPath) {
    //        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    //        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
    //     }
    //   },
    // }

    // props 的一些类型 https://cn.vuejs.org/v2/guide/components-props.html#ad
    // props: {
    //   // 基础的类型检查 (`null` 匹配任何类型)
    //   propA: Number,
    //   // 多个可能的类型
    //   propB: [String, Number],
    //   // 必填的字符串
    //   propC: {
    //     type: String,
    //     required: true
    //   },
    //   // 带有默认值的数字
    //   propD: {
    //     type: Number,
    //     default: 100
    //   },
    //   // 带有默认值的对象
    //   propE: {
    //     type: Object,
    //     // 对象或数组且一定会从一个工厂函数返回默认值
    //     default: function () {
    //       return { message: 'hello' }
    //     }
    //   },
    //   // 自定义验证函数
    //   propF: {
    //     validator: function (value) {
    //       // 这个值必须匹配下列字符串中的一个
    //       return ['success', 'warning', 'danger'].indexOf(value) !== -1
    //     }
    //   }
    // }

    // core/util/options
    function normalizeProps$1(props, res, vm) {
        if (!props) {
            return
        }
        var i, val, name
        if (Array.isArray(props)) {
            i = props.length
            while (i--) {
                val = props[i]
                if (typeof val === "string") {
                    name = camelize(val)
                    res[name] = {
                        type: null
                    }
                } else {
                }
            }
        } else if (isPlainObject(props)) {
            for (var key in props) {
                val = props[key]
                name = camelize(key)
                res[name] = isPlainObject(val)
                    ? val
                    : {
                          type: val
                      }
            }
        }

        // fix vueProps to properties
        for (var key$1 in res) {
            if (res.hasOwnProperty(key$1)) {
                var item = res[key$1]
                if (item.default) {
                    item.value = item.default
                }
                var oldObserver = item.observer
                item.observer = function(newVal, oldVal) {
                    vm[name] = newVal
                    // 先修改值再触发原始的 observer，跟 watch 行为保持一致
                    if (typeof oldObserver === "function") {
                        oldObserver.call(vm, newVal, oldVal)
                    }
                }
            }
        }

        return res
    }

    function normalizeProperties(vm) {
        var properties = vm.$options.properties
        var vueProps = vm.$options.props
        var res = {}

        normalizeProps$1(properties, res, vm)
        normalizeProps$1(vueProps, res, vm)

        return res
    }

    /**
     * 把 properties 中的属性 proxy 到 vm 上
     */
    function initMpProps(vm) {
        var mpProps = (vm._mpProps = {})
        var keys = Object.keys(vm.$options.properties || {})
        keys.forEach(function(key) {
            if (!(key in vm)) {
                proxy(vm, "_mpProps", key)
                mpProps[key] = undefined // for observe
            }
        })
        observe(mpProps, true)
    }

    function initMP(mpType, next) {
        var rootVueVM = this.$root
        if (!rootVueVM.$mp) {
            rootVueVM.$mp = {}
        }

        var mp = rootVueVM.$mp

        // Please do not register multiple Pages
        // if (mp.registered) {
        if (mp.status) {
            // 处理子组件的小程序生命周期
            if (mpType === "app") {
                callHook$1(this, "onLaunch", mp.appOptions)
            } else {
                this.__wxWebviewId__ = rootVueVM.__wxWebviewId__
                this.__wxExparserNodeId__ = rootVueVM.__wxExparserNodeId__
                callHook$1(this, "onLoad", mp.query)
                // callHook$1(this, "onReady") // 避免 onReady触发两次
            }
            return next()
        }
        // mp.registered = true

        mp.mpType = mpType
        mp.status = "register"

        if (mpType === "app") {
            global.App({
                // 页面的初始数据
                globalData: {
                    appOptions: {}
                },

                handleProxy: function handleProxy(e) {
                    return rootVueVM.$handleProxyWithVue(e)
                },

                // Do something initial when launch.
                onLaunch: function onLaunch(options) {
                    if (options === void 0) options = {}

                    mp.app = this
                    mp.status = "launch"
                    this.globalData.appOptions = mp.appOptions = options
                    callHook$1(rootVueVM, "onLaunch", options)
                    next()
                },

                // Do something when app show.
                onShow: function onShow(options) {
                    if (options === void 0) options = {}

                    mp.status = "show"
                    this.globalData.appOptions = mp.appOptions = options
                    callHook$1(rootVueVM, "onShow", options)
                },

                // Do something when app hide.
                onHide: function onHide() {
                    mp.status = "hide"
                    callHook$1(rootVueVM, "onHide")
                },

                onError: function onError(err) {
                    callHook$1(rootVueVM, "onError", err)
                },
                //fixed by xxxxxx
                onUniNViewMessage: function onUniNViewMessage(e) {
                    callHook$1(rootVueVM, "onUniNViewMessage", e)
                }
            })
        } else if (mpType === "component") {
            initMpProps(rootVueVM)

            global.Component({
                // 小程序原生的组件属性
                properties: normalizeProperties(rootVueVM),
                // 页面的初始数据
                data: {
                    $root: {}
                },
                methods: {
                    handleProxy: function handleProxy(e) {
                        return rootVueVM.$handleProxyWithVue(e)
                    }
                },
                // mp lifecycle for vue
                // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
                created: function created() {
                    mp.status = "created"
                    mp.page = this
                },
                // 组件生命周期函数，在组件实例进入页面节点树时执行
                attached: function attached() {
                    mp.status = "attached"
                    callHook$1(rootVueVM, "attached")
                },
                // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
                ready: function ready() {
                    mp.status = "ready"

                    callHook$1(rootVueVM, "ready")
                    next()

                    // 只有页面需要 setData
                    rootVueVM.$nextTick(function() {
                        rootVueVM._initDataToMP()
                    })
                },
                // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
                moved: function moved() {
                    callHook$1(rootVueVM, "moved")
                },
                // 组件生命周期函数，在组件实例被从页面节点树移除时执行
                detached: function detached() {
                    mp.status = "detached"
                    callHook$1(rootVueVM, "detached")
                }
            })
        } else {
            var app = global.getApp()
    
            
            global.Page({
                // 页面的初始数据
                data: {
                    $root: {}
                },

                handleProxy: function handleProxy(e) {
                    return rootVueVM.$handleProxyWithVue(e)
                },

                // mp lifecycle for vue
                // 生命周期函数--监听页面加载
                onLoad: function onLoad(query) {
                    rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
                    rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__
                    mp.page = this
                    mp.query = query
                    mp.status = "load"
                    getGlobalData(app, rootVueVM)
                    //仅load时重置数据
                    if (rootVueVM.$options && typeof rootVueVM.$options.data === "function") {
                    		Object.assign(rootVueVM.$data, rootVueVM.$options.data())
                    }
                    callHook$1(rootVueVM, "onLoad", query)
                },

                // 生命周期函数--监听页面显示
                onShow: function onShow() {
                    rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
                    rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__
                    mp.page = this
                    mp.status = "show"
                
                    callHook$1(rootVueVM, "onShow")
                    
                    //   // 只有页面需要 setData
                    rootVueVM.$nextTick(function () {
                    	rootVueVM._initDataToMP();
                    });
                },

                // 生命周期函数--监听页面初次渲染完成
                onReady: function onReady() {
                    mp.status = "ready"

                    callHook$1(rootVueVM, "onReady")
                    next()
                },

                // 生命周期函数--监听页面隐藏
                onHide: function onHide() {
                    mp.status = "hide"
                    callHook$1(rootVueVM, "onHide")
                },

                // 生命周期函数--监听页面卸载
                onUnload: function onUnload() {
                    mp.status = "unload"
                    callHook$1(rootVueVM, "onUnload")
                    mp.page = null
                },

                // 页面相关事件处理函数--监听用户下拉动作
                onPullDownRefresh: function onPullDownRefresh() {
                    callHook$1(rootVueVM, "onPullDownRefresh")
                },

                // 页面上拉触底事件的处理函数
                onReachBottom: function onReachBottom() {
                    callHook$1(rootVueVM, "onReachBottom")
                },

                // 用户点击右上角分享
                onShareAppMessage: rootVueVM.$options.onShareAppMessage
                    ? function(options) {
                          return callHook$1(rootVueVM, "onShareAppMessage", options)
                      }
                    : null,

                // Do something when page scroll
                onPageScroll: function onPageScroll(options) {
                    callHook$1(rootVueVM, "onPageScroll", options)
                },

                // 当前是 tab 页时，点击 tab 时触发
                onTabItemTap: function onTabItemTap(options) {
                    callHook$1(rootVueVM, "onTabItemTap", options)
                }
            })
        }
    }

    // 节流方法，性能优化
    // 全局的命名约定，为了节省编译的包大小一律采取形象的缩写，说明如下。
    // $c === $child
    // $k === $comKey

    // 新型的被拍平的数据结构
    // {
    //   $root: {
    //     '1-1'{
    //       // ... data
    //     },
    //     '1.2-1': {
    //       // ... data1
    //     },
    //     '1.2-2': {
    //       // ... data2
    //     }
    //   }
    // }

    function getVmData(vm) {
        // 确保当前 vm 所有数据被同步
        var dataKeys = [].concat(
            Object.keys(vm._data || {}),
            Object.keys(vm._props || {}),
            Object.keys(vm._mpProps || {}),
            Object.keys(vm._computedWatchers || {})
        )
        return dataKeys.reduce(function(res, key) {
            res[key] = vm[key]
            return res
        }, {})
    }

    function getParentComKey(vm, res) {
        if (res === void 0) res = []

        var ref = vm || {}
        var $parent = ref.$parent
        if (!$parent) {
            return res
        }
        res.unshift(getComKey($parent))
        if ($parent.$parent) {
            return getParentComKey($parent, res)
        }
        return res
    }

    function formatVmData(vm) {
        var $p = getParentComKey(vm).join(",")
        var $k = $p + ($p ? "," : "") + getComKey(vm)

        // getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据
        // 改动 vue.runtime 所获的的核心能力
        var data = Object.assign(getVmData(vm), {
            $k: $k,
            $kk: $k + ",",
            $p: $p
        })
        var key = "$root." + $k
        var res = {}
        res[key] = data
        return res
    }

    function collectVmData(vm, res) {
        if (res === void 0) res = {}

        var vms = vm.$children
        if (vms && vms.length) {
            vms.forEach(function(v) {
                return collectVmData(v, res)
            })
        }
        return Object.assign(res, formatVmData(vm))
    }

    /**
     * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
     * 自动合并 data
     *
     * @param  {function}   func      传入函数
     * @param  {number}     wait      表示时间窗口的间隔
     * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
     *                                如果想忽略结尾边界上的调用，传入{trailing: false}
     * @return {function}             返回客户调用函数
     */
    function throttle(func, wait, options) {
        var context, args, result
        var timeout = null
        // 上次执行时间点
        var previous = 0
        if (!options) {
            options = {}
        }
        // 延迟执行函数
        function later() {
            // 若设定了开始边界不执行选项，上次执行时间始终为0
            previous = options.leading === false ? 0 : Date.now()
            timeout = null
            result = func.apply(context, args)
            if (!timeout) {
                context = args = null
            }
        }
        return function(handle, data) {
            var now = Date.now()
            // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
            if (!previous && options.leading === false) {
                previous = now
            }
            // 延迟执行时间间隔
            var remaining = wait - (now - previous)
            context = this
            args = args ? [handle, Object.assign(args[1], data)] : [handle, data]
            // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
            // remaining大于时间窗口wait，表示客户端系统时间被调整过
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout)
                timeout = null
                previous = now
                result = func.apply(context, args)
                if (!timeout) {
                    context = args = null
                }
                // 如果延迟执行不存在，且没有设定结尾边界不执行选项
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }
            return result
        }
    }

    // 优化频繁的 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
    var throttleSetData = throttle(function(handle, data) {
        handle && handle(data)
    }, 50)

    function getPage(vm) {
        var rootVueVM = vm.$root
        var ref = rootVueVM.$mp || {}
        var mpType = ref.mpType
        if (mpType === void 0) mpType = ""
        var page = ref.page

        // 优化后台态页面进行 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
        if (mpType === "app" || !page || typeof page.setData !== "function") {
            return
        }
        return page
    }

    // 优化每次 setData 都传递大量新数据
    function updateDataToMP() {
        var page = getPage(this)
        if (!page) {
            return
        }

        var data = JSON.parse(JSON.stringify(formatVmData(this)))
        //fixed by xxxxxx
        throttleSetData(page.setData.bind(page), diff(data, page.data))
    }

    function initDataToMP() {
        var page = getPage(this)
        if (!page) {
            return
        }

        var data = collectVmData(this.$root)
        //fixed by xxxxxx
        page.setData(JSON.parse(JSON.stringify(data)))
    }

    function getVM(vm, comkeys) {
        if (comkeys === void 0) comkeys = []

        var keys = comkeys.slice(1)
        if (!keys.length) {
            return vm
        }

        return keys.reduce(function(res, key) {
            var len = res.$children.length
            for (var i = 0; i < len; i++) {
                var v = res.$children[i]
                var k = getComKey(v)
                if (k === key) {
                    res = v
                    return res
                }
            }
            return res
        }, vm)
    }

    function getHandle(vnode, eventid, eventTypes) {
        if (eventTypes === void 0) eventTypes = []

        var res = []
        if (!vnode || !vnode.tag) {
            return res
        }

        var ref = vnode || {}
        var data = ref.data
        if (data === void 0) data = {}
        var children = ref.children
        if (children === void 0) children = []
        var componentInstance = ref.componentInstance
        if (componentInstance) {
            // 增加 slot 情况的处理
            // Object.values 会多增加几行编译后的代码
            Object.keys(componentInstance.$slots).forEach(function(slotKey) {
                var slot = componentInstance.$slots[slotKey]
                var slots = Array.isArray(slot) ? slot : [slot]
                slots.forEach(function(node) {
                    res = res.concat(getHandle(node, eventid, eventTypes))
                })
            })
        } else {
            // 避免遍历超出当前组件的 vm
            children.forEach(function(node) {
                res = res.concat(getHandle(node, eventid, eventTypes))
            })
        }

        var attrs = data.attrs
        var on = data.on
        if (attrs && on && attrs["eventid"] === eventid) {
            eventTypes.forEach(function(et) {
                var h = on[et]
                if (typeof h === "function") {
                    res.push(h)
                } else if (Array.isArray(h)) {
                    res = res.concat(h)
                }
            })
            return res
        }

        return res
    }

    function getWebEventByMP(e) {
        var type = e.type
        var timeStamp = e.timeStamp
        var touches = e.touches
        var detail = e.detail
        if (detail === void 0) detail = {}
        var target = e.target
        if (target === void 0) target = {}
        var currentTarget = e.currentTarget
        if (currentTarget === void 0) currentTarget = {}
        var x = detail.x
        var y = detail.y
        var event = {
            mp: e,
            type: type,
            timeStamp: timeStamp,
            x: x,
            y: y,
            target: Object.assign({}, target, detail),
            detail: detail, //fixed by xxxxxx
            currentTarget: currentTarget,
            stopPropagation: noop,
            preventDefault: noop
        }

        if (touches && touches.length) {
            Object.assign(event, touches[0])
            event.touches = touches
        }
        return event
    }

    function handleProxyWithVue(e) {
        var rootVueVM = this.$root
        var type = e.type
        var target = e.target
        if (target === void 0) target = {}
        var currentTarget = e.currentTarget
        var ref = currentTarget || target
        var dataset = ref.dataset
        if (dataset === void 0) dataset = {}
        var comkey = dataset.comkey
        if (comkey === void 0) comkey = ""
        var eventid = dataset.eventid
        var vm = getVM(rootVueVM, comkey.split(","))

        if (!vm) {
            return
        }

        var webEventTypes = eventTypeMap[type] || [type]
        var handles = getHandle(vm._vnode, eventid, webEventTypes)

        // TODO, enevt 还需要处理更多
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Event
        if (handles.length) {
            var event = getWebEventByMP(e)
            if (handles.length === 1) {
                var result = handles[0](event)
                return result
            }
            handles.forEach(function(h) {
                return h(event)
            })
        }
    }

    // for platforms
    // import config from 'core/config'
    // install platform specific utils
    Vue$3.config.mustUseProp = mustUseProp
    Vue$3.config.isReservedTag = isReservedTag
    Vue$3.config.isReservedAttr = isReservedAttr
    Vue$3.config.getTagNamespace = getTagNamespace
    Vue$3.config.isUnknownElement = isUnknownElement

    // install platform patch function
    Vue$3.prototype.__patch__ = patch

    // public mount method
    Vue$3.prototype.$mount = function(el, hydrating) {
        var this$1 = this

        // el = el && inBrowser ? query(el) : undefined
        // return mountComponent(this, el, hydrating)

        // 初始化小程序生命周期相关
        var options = this.$options

        if (options && (options.render || options.mpType)) {
            var mpType = options.mpType
            if (mpType === void 0) mpType = "page"
            return this._initMP(mpType, function() {
                return mountComponent(this$1, undefined, undefined)
            })
        } else {
            return mountComponent(this, undefined, undefined)
        }
    }

    // for mp
    Vue$3.prototype._initMP = initMP

    Vue$3.prototype.$updateDataToMP = updateDataToMP
    Vue$3.prototype._initDataToMP = initDataToMP

    Vue$3.prototype.$handleProxyWithVue = handleProxyWithVue

    /*  */

    return Vue$3
})

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\common\\js\\common.js":
/*!******************************************************!*\
  !*** C:/Users/热水/movecar_wechat/common/js/common.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));var _requestUrl = __webpack_require__(/*! ./requestUrl */ "C:\\Users\\热水\\movecar_wechat\\common\\js\\requestUrl.js");
var _storages = __webpack_require__(/*! ./storages */ "C:\\Users\\热水\\movecar_wechat\\common\\js\\storages.js");
var _unifly = _interopRequireDefault(__webpack_require__(/*! unifly */ "C:\\Users\\热水\\movecar_wechat\\node_modules\\unifly\\uniFly.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var storage = new _storages.Storages();

_unifly.default.baseUrl = 'https://www.imgaoxianshen.cn';
_unifly.default.timeOut = 20000;

function showToast(title) {var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  uni.showToast({
    title: title,
    icon: icon,
    duration: 2000 });

}

_unifly.default.requestInterceptors.success = function (request) {
  var token = storage.gets('token', null);
  //配置基本信息
  request.headers['token'] = token;
  uni.showLoading();
  return request;
};
_unifly.default.responseInterceptors.success = function (request) {
  uni.hideLoading();
  if (request.data.code != 200 && request.data.code != 450) {
    showToast(request.data.msg);
    return Promise.resolve(request.data);
  }
  return Promise.resolve(request.data);
};

function requestGet(url, params) {
  return _unifly.default.get({
    url: url,
    params: params });

}

function requestPost(url, params) {
  return _unifly.default.post({
    url: url,
    params: params });

}function

getLoginAndRequest(_x, _x2, _x3, _x4) {return _getLoginAndRequest.apply(this, arguments);}function _getLoginAndRequest() {_getLoginAndRequest = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(url, data, cb, method) {var _ref, _ref2, error, res, code;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (

              uni.login({ provider: 'weixin' }));case 2:_ref = _context2.sent;_ref2 = _slicedToArray(_ref, 2);error = _ref2[0];res = _ref2[1];

            if (error) {
              showToast('登陆失败');
            } else {
              code = res.code;

              requestGet(_requestUrl.loginUrl, { code: code }).then(function (res) {

                if (res.code == 200) {
                  storage.put('token', res.result, 24 * 60 * 60);
                  // 然后请求接口
                  if (method == 'post') {
                    requestPost(url, data).then(function (requestRes) {
                      cb(requestRes);
                    });
                  } else {
                    requestGet(url, data).then(function (requestRes) {
                      cb(requestRes);
                    });
                  }
                } else {
                  showToast('登陆接口获取失败');
                }
              });
            }case 7:case "end":return _context2.stop();}}}, _callee2, this);}));return _getLoginAndRequest.apply(this, arguments);}



module.exports = {
  request: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(url, data, cb) {var method,token,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:method = _args.length > 3 && _args[3] !== undefined ? _args[3] : 'get';
              // const storage = new Storages()
              token = storage.gets('token', false);if (
              token) {_context.next = 7;break;}_context.next = 5;return (
                getLoginAndRequest(url, data, cb, method));case 5:_context.next = 8;break;case 7:

              if (method == 'post') {
                requestPost(url, data).then(function (requestRes) {
                  if (requestRes.code == 101) {
                    getLoginAndRequest(url, data, cb, method);
                  } else {
                    cb(requestRes);
                  }
                });
              } else {
                requestGet(url, data).then(function (requestRes) {
                  if (requestRes.code == 101) {
                    getLoginAndRequest(url, data, cb, method);
                  } else {
                    cb(requestRes);
                  }
                });
              }case 8:case "end":return _context.stop();}}}, _callee, this);}));function request(_x5, _x6, _x7) {return _request.apply(this, arguments);}return request;}(),









  showToast: showToast,
  getQueryString: function getQueryString(url, name) {
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
    var r = url.substr(1).match(reg);
    if (r != null) {
      return r[2];
    }
    return null;
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\common\\js\\requestUrl.js":
/*!**********************************************************!*\
  !*** C:/Users/热水/movecar_wechat/common/js/requestUrl.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var baseUrl = 'api/';

module.exports = {
  // main
  loginUrl: baseUrl + 'user/login',
  isLoginUrl: baseUrl + 'user/isLogin',
  getCalllMsg: baseUrl + 'user/getCalllMsg',
  bindPhone: baseUrl + 'user/bindPhone',
  getYanZhengCode: baseUrl + 'user/getYanZhengCode',
  sendMoveCarCode: baseUrl + 'user/sendMoveCarCode',

  // carcard
  getCarCardList: baseUrl + 'card/getCarCardList',
  addCarCard: baseUrl + 'card/addCarCard',
  changeChoose: baseUrl + 'card/changeChoose',
  deleteCard: baseUrl + 'card/deleteCard',
  addCarCardAndBindUser: baseUrl + 'card/addCarCardAndBindUser',

  // pay
  placeOrderAndPay: baseUrl + 'order/placeOrderAndPay',
  payOrder: baseUrl + 'order/payOrder',

  // order
  getOrderList: baseUrl + 'order/getOrderList',

  // status
  changeNoticeStatus: baseUrl + 'loginUser/changeNoticeStatus',
  updateUserInfo: baseUrl + 'loginUser/updateUserInfo',
  getUserInfo: baseUrl + 'loginUser/getUserInfo',
  bindUser: baseUrl + 'loginUser/bindUser', //绑定挪车码

  // 获取小程序码
  getWechatCode: baseUrl + 'code/getWechatCode',

  // adv
  getAdvList: baseUrl + 'adv/getAdvList',
  getAdvOfOne: baseUrl + 'adv/getAdvOfOne',

  // joinUs
  addJoin: baseUrl + 'joinUs/addJoin' };

/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\common\\js\\storages.js":
/*!********************************************************!*\
  !*** C:/Users/热水/movecar_wechat/common/js/storages.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Storages = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var Storages = /*#__PURE__*/function () {function Storages() {_classCallCheck(this, Storages);}_createClass(Storages, [{ key: "put", value: function put(
    key, val, time) {
      wx.setStorageSync(key, val);
      var seconds = parseInt(time);
      if (seconds > 0) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000 + seconds;
        wx.setStorageSync(key + 'dtime', timestamp + "");
      } else {
        wx.removeStorageSync(key + 'dtime');
      }
    } }, { key: "gets", value: function gets(
    key, def) {
      var deadtime = parseInt(wx.getStorageSync(key + 'dtime'));
      if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
          if (def) {
            return def;
          } else {
            return;
          }
        }
      }
      var res = wx.getStorageSync(key);
      if (res) {
        return res;
      } else {
        return def;
      }
    } }]);return Storages;}();exports.Storages = Storages;

/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\node_modules\\unifly\\uniFly.js":
/*!****************************************************************!*\
  !*** C:/Users/热水/movecar_wechat/node_modules/unifly/uniFly.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {!function (e, t) { true ? module.exports = t() : undefined;}(void 0, function () {return function (e) {var t = {};function r(n) {if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;}return r.m = e, r.c = t, r.d = function (e, t, n) {r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });}, r.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });}, r.t = function (e, t) {if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var n = Object.create(null);if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) {r.d(n, o, function (t) {return e[t];}.bind(null, o));}return n;}, r.n = function (e) {var t = e && e.__esModule ? function () {return e.default;} : function () {return e;};return r.d(t, "a", t), t;}, r.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, r.p = "", r(r.s = 1);}([function (e, t, r) {var n;n = function n() {return function (e) {var t = {};function r(n) {if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;}return r.m = e, r.c = t, r.i = function (e) {return e;}, r.d = function (e, t, n) {r.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: n });}, r.n = function (e) {var t = e && e.__esModule ? function () {return e.default;} : function () {return e;};return r.d(t, "a", t), t;}, r.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, r.p = "", r(r.s = 13);}([function (e, t, r) {"use strict";var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;};e.exports = { type: function type(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}, isObject: function isObject(e, t) {return t ? "object" === this.type(e) : e && "object" === (void 0 === e ? "undefined" : n(e));}, isFormData: function isFormData(e) {return "undefined" != typeof FormData && e instanceof FormData;}, trim: function trim(e) {return e.replace(/(^\s*)|(\s*$)/g, "");}, encode: function encode(e) {return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");}, formatParams: function formatParams(e) {var t = "",r = !0,n = this;return this.isObject(e) ? (function e(o, s) {var i = n.encode,a = n.type(o);if ("array" == a) o.forEach(function (t, r) {n.isObject(t) || (r = ""), e(t, s + "%5B" + r + "%5D");});else if ("object" == a) for (var u in o) {e(o[u], s ? s + "%5B" + i(u) + "%5D" : i(u));} else r || (t += "&"), r = !1, t += s + "=" + i(o);}(e, ""), t) : e;}, merge: function merge(e, t) {for (var r in t) {e.hasOwnProperty(r) ? this.isObject(t[r], 1) && this.isObject(e[r], 1) && this.merge(e[r], t[r]) : e[r] = t[r];}return e;} };}, function (e, t, r) {var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},o = function () {function e(e, t) {for (var r = 0; r < t.length; r++) {var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);}}return function (t, r, n) {return r && e(t.prototype, r), n && e(t, n), t;};}(),s = r(0),i = "undefined" != typeof document;e.exports = function (e) {return function () {function t() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t), this.requestHeaders = {}, this.readyState = 0, this.timeout = 0, this.responseURL = "", this.responseHeaders = {};}return o(t, [{ key: "_call", value: function value(e) {this[e] && this[e].apply(this, [].splice.call(arguments, 1));} }, { key: "_changeReadyState", value: function value(e) {this.readyState = e, this._call("onreadystatechange");} }, { key: "open", value: function value(e, t) {if (this.method = e, t) {if (0 !== (t = s.trim(t)).indexOf("http") && i) {var r = document.createElement("a");r.href = t, t = r.href;}} else t = location.href;this.responseURL = t, this._changeReadyState(1);} }, { key: "send", value: function value(t) {var r = this;t = t || null;var o = this;if (e) {var a = { method: o.method, url: o.responseURL, headers: o.requestHeaders || {}, body: t };s.merge(a, o._options || {}), "GET" === a.method && (a.body = null), o._changeReadyState(3);var u = void 0;o.timeout = o.timeout || 0, 0 < o.timeout && (u = setTimeout(function () {3 === o.readyState && (r._call("onloadend"), o._changeReadyState(0), o._call("ontimeout"));}, o.timeout)), a.timeout = o.timeout, e(a, function (e) {function t(t) {var r = e[t];return delete e[t], r;}if (3 === o.readyState) {clearTimeout(u), o.status = t("statusCode") - 0;var r = t("responseText"),s = t("statusMessage");if (o.status) {var a = t("headers"),c = {};for (var f in a) {var l = a[f],p = f.toLowerCase();"object" === (void 0 === l ? "undefined" : n(l)) ? c[p] = l : (c[p] = c[p] || [], c[p].push(l));}var d = c["set-cookie"];i && d && d.forEach(function (e) {document.cookie = e.replace(/;\s*httpOnly/gi, "");}), o.responseHeaders = c, o.statusText = s || "", o.response = o.responseText = r, o._response = e, o._changeReadyState(4), o._call("onload");} else o.statusText = r, o._call("onerror", { msg: s });o._call("onloadend");}});} else console.error("Ajax require adapter");} }, { key: "setRequestHeader", value: function value(e, t) {this.requestHeaders[s.trim(e)] = t;} }, { key: "getResponseHeader", value: function value(e) {return (this.responseHeaders[e.toLowerCase()] || "").toString() || null;} }, { key: "getAllResponseHeaders", value: function value() {var e = "";for (var t in this.responseHeaders) {e += t + ":" + this.getResponseHeader(t) + "\r\n";}return e || null;} }, { key: "abort", value: function value(e) {this._changeReadyState(0), this._call("onerror", { msg: e }), this._call("onloadend");} }], [{ key: "setAdapter", value: function value(t) {e = t;} }]), t;}();};}, function (e, t, r) {var n = function () {function e(e, t) {for (var r = 0; r < t.length; r++) {var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);}}return function (t, r, n) {return r && e(t.prototype, r), n && e(t, n), t;};}(),o = r(0),s = "undefined" != typeof document,i = function () {function e(t) {function r(e) {var t = void 0,r = void 0;function n() {e.p = t = r = null;}o.merge(e, { lock: function lock() {t || (e.p = new Promise(function (e, n) {t = e, r = n;}));}, unlock: function unlock() {t && (t(), n());}, clear: function clear() {r && (r("cancel"), n());} });}!function (t, r) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}(this), this.engine = t || XMLHttpRequest;var n = (this.default = this).interceptors = { response: { use: function use(e, t) {this.handler = e, this.onerror = t;} }, request: { use: function use(e) {this.handler = e;} } },s = n.request;r(n.response), r(s), this.config = { method: "GET", baseURL: "", headers: {}, timeout: 0, params: {}, parseJson: !0, withCredentials: !1 };}return n(e, [{ key: "request", value: function value(e, t, r) {var n = this,i = new this.engine(),a = "Content-Type",u = a.toLowerCase(),c = this.interceptors,f = c.request,l = c.response,p = f.handler,d = new Promise(function (c, d) {function h(e) {return e && e.then && e.catch;}function m(e, t) {e ? e.then(function () {t();}) : t();}o.isObject(e) && (e = (r = e).url), (r = r || {}).headers = r.headers || {}, m(f.p, function () {o.merge(r, JSON.parse(JSON.stringify(n.config)));var y = r.headers;y[a] = y[a] || y[u] || "", delete y[u], r.body = t || r.body, e = o.trim(e || ""), r.method = r.method.toUpperCase(), r.url = e;var v = r;p && (v = p.call(f, r, Promise) || r), h(v) || (v = Promise.resolve(v)), v.then(function (n) {n === r ? function (r) {t = r.body, e = o.trim(r.url);var n = o.trim(r.baseURL || "");if (e || !s || n || (e = location.href), 0 !== e.indexOf("http")) {var f = "/" === e[0];if (!n && s) {var p = location.pathname.split("/");p.pop(), n = location.protocol + "//" + location.host + (f ? "" : p.join("/"));}if ("/" !== n[n.length - 1] && (n += "/"), e = n + (f ? e.substr(1) : e), s) {var y = document.createElement("a");y.href = e, e = y.href;}}var v = o.trim(r.responseType || ""),b = -1 !== ["GET", "HEAD", "DELETE", "OPTION"].indexOf(r.method),g = o.type(t),w = r.params || {};b && "object" === g && (w = o.merge(t, w));var O = [];(w = o.formatParams(w)) && O.push(w), b && t && "string" === g && O.push(t), 0 < O.length && (e += (-1 === e.indexOf("?") ? "?" : "&") + O.join("&")), i.open(r.method, e);try {i.withCredentials = !!r.withCredentials, i.timeout = r.timeout || 0, "stream" !== v && (i.responseType = v);} catch (n) {}var j = r.headers[a] || r.headers[u],P = "application/x-www-form-urlencoded";for (var x in o.trim((j || "").toLowerCase()) === P ? t = o.formatParams(t) : o.isFormData(t) || -1 === ["object", "array"].indexOf(o.type(t)) || (P = "application/json;charset=utf-8", t = JSON.stringify(t)), j || b || (r.headers[a] = P), r.headers) {if (x === a && o.isFormData(t)) delete r.headers[x];else try {i.setRequestHeader(x, r.headers[x]);} catch (n) {}}function E(e, t, n) {m(l.p, function () {if (e) {n && (t.request = r);var o = e.call(l, t, Promise);t = void 0 === o ? t : o;}h(t) || (t = Promise[0 === n ? "resolve" : "reject"](t)), t.then(function (e) {c(e);}).catch(function (e) {d(e);});});}function S(e) {e.engine = i, E(l.onerror, e, -1);}function k(e, t) {this.message = e, this.status = t;}i.onload = function () {try {var e = i.response || i.responseText;e && r.parseJson && -1 !== (i.getResponseHeader(a) || "").indexOf("json") && !o.isObject(e) && (e = JSON.parse(e));var t = i.responseHeaders;if (!t) {t = {};var n = (i.getAllResponseHeaders() || "").split("\r\n");n.pop(), n.forEach(function (e) {if (e) {var r = e.split(":")[0];t[r] = i.getResponseHeader(r);}});}var s = i.status,u = i.statusText,c = { data: e, headers: t, status: s, statusText: u };if (o.merge(c, i._response), 200 <= s && s < 300 || 304 === s) c.engine = i, c.request = r, E(l.handler, c, 0);else {var f = new k(u, s);f.response = c, S(f);}} catch (f) {S(new k(f.msg, i.status));}}, i.onerror = function (e) {S(new k(e.msg || "Network Error", 0));}, i.ontimeout = function () {S(new k("timeout [ " + i.timeout + "ms ]", 1));}, i._options = r, setTimeout(function () {i.send(b ? null : t);}, 0);}(n) : c(n);}, function (e) {d(e);});});});return d.engine = i, d;} }, { key: "all", value: function value(e) {return Promise.all(e);} }, { key: "spread", value: function value(e) {return function (t) {return e.apply(null, t);};} }]), e;}();i.default = i, ["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {i.prototype[e] = function (t, r, n) {return this.request(t, r, o.merge({ method: e }, n));};}), ["lock", "unlock", "clear"].forEach(function (e) {i.prototype[e] = function () {this.interceptors.request[e]();};}), e.exports = i;},,,,, function (e, t, r) {"use strict";e.exports = function (e, t) {var r = { method: e.method, url: e.url, dataType: e.dataType || void 0, header: e.headers, data: e.body || {}, responseType: e.responseType || "text", success: function success(e) {t({ statusCode: e.statusCode, responseText: e.data, headers: e.header, statusMessage: e.errMsg });}, fail: function fail(e) {t({ statusCode: e.statusCode || 0, statusMessage: e.errMsg });} };wx.request(r);};},,,,,, function (e, t, r) {"use strict";var n = r(2),o = r(1)(r(7));e.exports = function (e) {return new n(e || o);};}]);}, e.exports = n();}, function (e, t, r) {"use strict";function n(e) {for (var t = 1; t < arguments.length; t++) {var r = null != arguments[t] ? arguments[t] : {},n = Object.keys(r);"function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function (e) {return Object.getOwnPropertyDescriptor(r, e).enumerable;}))), n.forEach(function (t) {o(e, t, r[t]);});}return e;}function o(e, t, r) {return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;}r.r(t);var s = function s(e) {null != e && null != e.title && 0 < e.title.length && (null == e.icon && (e.icon = "none"), void 0 === e.mask && (e.mask = !0), uni.showToast(n({ duration: 2e3 }, e)));},i = function i(e) {(null == (e = n({}, e)).title || e.title.length < 1) && (e.title = "加载中..."), void 0 === e.mask && (e.mask = !0), uni.showLoading(n({}, e));},a = function a() {uni.hideLoading();},u = r(0),c = r.n(u);function f(e) {for (var t = 1; t < arguments.length; t++) {var r = null != arguments[t] ? arguments[t] : {},n = Object.keys(r);"function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function (e) {return Object.getOwnPropertyDescriptor(r, e).enumerable;}))), n.forEach(function (t) {l(e, t, r[t]);});}return e;}function l(e, t, r) {return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;}var p = function e(t) {var r = t.baseUrl,n = t.timeout,o = t.headers,s = t.showLoading,i = t.showError,a = t.requestInterceptors,u = t.responseInterceptors;!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), e.headers = o, e.showLoading = s, e.showError = i;var l = new c.a();l.config.baseURL = r, l.config.timeout = n, a = f({}, e.requestInterceptors, a), u = f({}, e.responseInterceptors, u), l.interceptors.request.use(a.success, a.error), l.interceptors.response.use(u.success, u.error), this.fly = l;};p.headers = {}, p.showLoading = !0, p.showError = !0, p.requestInterceptors = { success: function success(e) {return console.log("请求拦截"), e.headers = p.headers, 1 == p.showLoading && i(), e;}, error: function error(e) {return a(), p.showError && s({ title: "请求拦截失败" }), Promise.reject(e);} }, p.responseInterceptors = { success: function success(e) {return p.showLoading && a(), console.log("响应拦截"), Promise.resolve(e);}, error: function error(e) {return a(), p.showError && s({ title: "响应拦截失败" }), Promise.reject(e);} };var d = p;function h(e) {for (var t = 1; t < arguments.length; t++) {var r = null != arguments[t] ? arguments[t] : {},n = Object.keys(r);"function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function (e) {return Object.getOwnPropertyDescriptor(r, e).enumerable;}))), n.forEach(function (t) {m(e, t, r[t]);});}return e;}function m(e, t, r) {return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;}function y(e, t) {for (var r = 0; r < t.length; r++) {var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);}}var v = function () {function e() {!function (t, r) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}(this);}return t = e, (r = [{ key: "instance", value: function value(t) {var r = t.headers,n = t.showLoading,o = void 0 === n || n,s = t.showError,i = void 0 === s || s,a = t.timeout,u = void 0 === a ? e.timeOut : a;if (!e.baseUrl) throw new Error("请先设置基础路由baseUrl");return r = h({}, e.headers, r), new d({ baseUrl: e.baseUrl, timeout: u, headers: r, showLoading: o, showError: i, requestInterceptors: e.requestInterceptors, responseInterceptors: e.responseInterceptors });} }, { key: "get", value: function value(t) {var r = t.url,n = t.params,o = t.showLoading,s = t.showError,i = t.timeout,a = t.headers,u = e.instance({ showLoading: o, showError: s, timeout: i, headers: void 0 === a ? {} : a });return new Promise(function (t, o) {u.fly.get(r, h({}, e.baseParam, n)).then(function (e) {t(e);}).catch(function (e) {o(e);});});} }, { key: "post", value: function value(t) {var r = t.url,n = t.params,o = t.showLoading,s = t.showError,i = t.timeout,a = t.headers,u = e.instance({ showLoading: o, showError: s, timeout: i, headers: void 0 === a ? {} : a });return new Promise(function (t, o) {u.fly.post(r, h({}, e.baseParam, n)).then(function (e) {t(e);}).catch(function (e) {o(e);});});} }, { key: "put", value: function value(t) {var r = t.url,n = t.params,o = t.showLoading,s = t.showError,i = t.timeout,a = t.headers,u = e.instance({ showLoading: o, showError: s, timeout: i, headers: void 0 === a ? {} : a });return new Promise(function (t, o) {u.fly.put(r, h({}, e.baseParam, n)).then(function (e) {t(e);}).catch(function (e) {o(e);});});} }, { key: "delete", value: function value(t) {var r = t.url,n = t.params,o = t.showLoading,s = t.showError,i = t.timeout,a = t.headers,u = e.instance({ showLoading: o, showError: s, timeout: i, headers: void 0 === a ? {} : a });return new Promise(function (t, o) {u.fly.delete(r, h({}, e.baseParam, n)).then(function (e) {t(e);}).catch(function (e) {o(e);});});} }]) && y(t, r), e;var t, r;}();v.baseUrl = "", v.timeOut = 2e4, v.headers = { common: {}, "Content-Type": "application/json" }, v.baseParam = {}, v.requestInterceptors = {}, v.responseInterceptors = {};var b = v;t.default = b;}]).default;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\pages.json":
/*!*********************************************!*\
  !*** C:/Users/热水/movecar_wechat/pages.json ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\static\\img\\icon\\card.png":
/*!***********************************************************!*\
  !*** C:/Users/热水/movecar_wechat/static/img/icon/card.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAA7EAAAOxAGVKw4bAAA57mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDQtMjZUMTg6MzI6MzgrMDg6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE5LTA0LTI2VDE4OjMyOjM4KzA4OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wNC0yNlQxODozMjozOCswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ODkzZDI2ODgtZTc2YS1hNjQzLTg2YTUtNWJjNTRlM2QwOTQ3PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OThlZGQ2MmMtNjgwZC0xMWU5LWEyMWEtYTcyMTAyN2NlMDc0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NDMwZWVmYmYtZjRmOS1iZDQ5LThjMmItNjU2ODhlZmQwYjViPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjQzMGVlZmJmLWY0ZjktYmQ0OS04YzJiLTY1Njg4ZWZkMGI1Yjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wNC0yNlQxODozMjozOCswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo4OTNkMjY4OC1lNzZhLWE2NDMtODZhNS01YmM1NGUzZDA5NDc8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDQtMjZUMTg6MzI6MzgrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj45NjAxMjAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjk2MDEyMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjAwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjIwMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+DP7NhgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAZhUlEQVR42uydeXhTZfbHv/feLE2apltKC5RQQQYpILSyKIsgWlFRGNl+AuKI27gxgw7uyMio6Ag66LiNOjqODoNgRHYYQGQRQYSUxQJiWUqxdEvbJE2z398f9wKltGm2Jjfp+TxPntCQ5L73fc8373rOYfjisSDaBA6AFkAKgFTx32oAKvFZDSBBfJ9c/IwSAAvAC8AhvuYC4AFgB2ATHw3isxlADYBa8d8eqvbwIqMqCIsQdAAyGz10oiDYIL+TFYWERs+t4RVFUgWgvNGjioRDAokkGgBdAOjF546iSKINK/ZWKQAub/S6B0AZgNMASsRnKzWjfzA0xGoVBYBuotF1A5AWB/dkAnAcwC/is5OamXqQQNACyAXQA0DXOKynNPExQOxhTgH4GUCROEwjqAdpduiUC6CPOHRi2mEd8OIQ7JAoFisJpH0LRA6gF4D+AHJCmFTHq1hOACgEcBjCahoNsdoJ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"

/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\static\\img\\icon\\chetie.png":
/*!*************************************************************!*\
  !*** C:/Users/热水/movecar_wechat/static/img/icon/chetie.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/chetie.92af7ed3.png";

/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\static\\img\\icon\\delete.png":
/*!*************************************************************!*\
  !*** C:/Users/热水/movecar_wechat/static/img/icon/delete.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\static\\img\\icon\\order.png":
/*!************************************************************!*\
  !*** C:/Users/热水/movecar_wechat/static/img/icon/order.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUFEN0ZGNDM2ODBFMTFFOTlCQkRCM0RENzAwNUEzQzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUFEN0ZGNDI2ODBFMTFFOTlCQkRCM0RENzAwNUEzQzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5OGVkZDYyYy02ODBkLTExZTktYTIxYS1hNzIxMDI3Y2UwNzQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5OGVkZDYyYy02ODBkLTExZTktYTIxYS1hNzIxMDI3Y2UwNzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+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"

/***/ }),

/***/ "C:\\Users\\热水\\movecar_wechat\\static\\img\\icon\\qrcode.png":
/*!*************************************************************!*\
  !*** C:/Users/热水/movecar_wechat/static/img/icon/qrcode.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0FGMzNCRjM2ODBFMTFFOUE4RTE4NDE4NUU2NTMzMTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0FGMzNCRjI2ODBFMTFFOUE4RTE4NDE4NUU2NTMzMTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5OGVkZDYyYy02ODBkLTExZTktYTIxYS1hNzIxMDI3Y2UwNzQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5OGVkZDYyYy02ODBkLTExZTktYTIxYS1hNzIxMDI3Y2UwNzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map