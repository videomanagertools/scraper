import Store from 'electron-store';

const store = new Store({
  defaults: {
    scene: ['movie', 'normal'],
    tags: ['无']
  }
});

export default store;
