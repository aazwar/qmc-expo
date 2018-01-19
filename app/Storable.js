import { AsyncStorage } from 'react-native';

export default class Storable {
  store() {
    AsyncStorage.setItem(`@${this.constructor.name}`, JSON.stringify(this));
  }

  async load() {
    await AsyncStorage.getItem(`@${this.constructor.name}`).then(json => {
      let obj = JSON.parse(json);
      if (obj) this.assign(obj);
    });
  }

  values() {
    let result = {};
    let self = this;
    Object.keys(self).map(k => (result[k] = self[k]));
    return result;
  }

  assign(obj) {
    let self = this;
    Object.keys(self).map(k => (self[k] = obj[k]));
  }
}
