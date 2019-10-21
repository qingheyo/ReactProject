import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'global', ...(require('/Users/daihongbo/Desktop/cloud/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/Users/daihongbo/Desktop/cloud/src/models/login.js').default) });
app.model({ namespace: 'logs', ...(require('/Users/daihongbo/Desktop/cloud/src/models/logs.js').default) });
app.model({ namespace: 'newsCenter', ...(require('/Users/daihongbo/Desktop/cloud/src/models/newsCenter.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/daihongbo/Desktop/cloud/src/models/setting.js').default) });
app.model({ namespace: 'staff', ...(require('/Users/daihongbo/Desktop/cloud/src/models/staff.js').default) });
app.model({ namespace: 'user', ...(require('/Users/daihongbo/Desktop/cloud/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
