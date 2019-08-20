const Modal = {
  install(Vue) {
    this.event = new Vue();
    Vue.prototype.$modal = {
      show(modal, content) {
        Modal.event.$emit(modal, content);
      },
      hide(modal) {
        Modal.event.$emit(modal);
      },
      $event: this.event,
    };
  },
};

export default Modal;
