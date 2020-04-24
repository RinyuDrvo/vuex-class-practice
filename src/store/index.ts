import Vue from 'vue';
import Vuex from 'vuex';
import { action, createModule, createProxy, extractVuexModule, mutation } from 'vuex-class-component';

Vue.use(Vuex);

// vuexモジュール作成
const VuexModule = createModule();

export class CounterStore extends VuexModule {

  // state
  // 公開する
  public count: number = 0;

  @mutation
  public increment() {
    this.count++;
  }

  @mutation
  public decrement() {
    this.count--;
  }

  @action
  public async incrementIfOdd() {
    if ((this.count + 1) % 2 === 0) {
      this.increment();
    }
  }

  @action
  public async incrementAsync() {
    return setTimeout(() => this.increment(), 1000);
  }
}

const store = new Vuex.Store({
  modules: {
    // Vuexモジュールの抽出
    ...extractVuexModule(CounterStore),
  },
});

export default store;

// Vuex Managerパターン
export const vxm = {
  // Storeプロキシの作成
  counter: createProxy(store, CounterStore),
};
