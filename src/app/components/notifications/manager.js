import eventEmitter from "./event-emitter";

class Manager {
  info(msg) {
    eventEmitter.emit("notification", msg);
  }
  warn(msg) {
    eventEmitter.emit("notification", msg);
  }
  success(msg) {
    eventEmitter.emit("notification", msg);
  }
}

export default new Manager();
