import Vue from "vue";

const emitter = new Vue();

export const publish = function Emit(eventName, data) {
  emitter.$emit(eventName, data);
};

export const subscribe = function On(eventName, callback) {
  emitter.$on(eventName, callback);
};

export const subscribeOnce = function Once(eventName, callback) {
  emitter.$once(eventName, callback);
};

export const unsubscribe = function Off(eventName, callback) {
  emitter.$off(eventName, callback);
};

export const unsubscribeAll = (evnts) => {
  emitter.$off(evnts);
};

Vue.prototype.$emitter = {
  publish,
  subscribe,
  subscribeOnce,
  unsubscribe,
  unsubscribeAll,
};
