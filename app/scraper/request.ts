import request from 'request-promise';
import config from '@config';

export default opts => {
  const proxy = config.get('proxy');
  const url = proxy.enable ? proxy.url : '';
  return request({ ...opts, proxy: url });
};
