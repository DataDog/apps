const init = async () => {
  switch (window.location.pathname) {
    case "/widget": {
      let widget = await import("./widget");
      return widget.default();
    }
    default: {
      let controller = await import("./controller");
      return controller.default();
    }
  }
};

init();
export {};
