import Store from 'electron-store';

const store = new Store({
  defaults: {
    scene: ['movie', 'normal'],
    tags: ['无'],
    proxy: {
      enable: false,
      url: 'http://127.0.0.1:1087'
    }
  }
});

export default store;
