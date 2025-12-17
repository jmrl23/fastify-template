import('init.js').then((mod) => {
  /**
   * Initialize before
   * running the server
   */
  mod.init().then(() => {
    import('server.js').then((mod) => mod.run());
  });
});
