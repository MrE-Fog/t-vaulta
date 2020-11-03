/* eslint-disable no-console */
import axios from 'axios';
import config from '../../../config';

export const getUniMessage = () => {
  const url = config.url.replace('/vault/v2', '');
  axios
    .get(`${url}/app/Messages/uimessages.properties`, {
      headers: { 'vault-token': null, 'Access-Control-Allow-Origin': '*' },
    })
    .then((res) => console.log('res', res))
    .catch((err) => console.log('err', err));
};

export const revokeToken = () => {
  const url = config.url.replace('/v2', '');
  return axios
    .get(`${url}/auth/tvault/revoke`, {
      headers: { 'vault-token': sessionStorage.getItem('token') },
    })
    .then((res) => console.log('res', res))
    .catch((e) => console.log('e', e));
};

export default {
  getUniMessage,
  revokeToken,
};
