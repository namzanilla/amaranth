import axios from 'axios';

let host;

if (typeof window === 'undefined') {
  const {HOST_APP} = process.env;
  host = HOST_APP;
} else {
  host = '';
}

export default (props) => {
  const {
    method = 'GET',
    version = 1,
    path,
    query,
  } = props;

  let uri = `${host}/api/v${version}`;

  if (path) {
    uri += path;
  }

  if (query) {
    uri += `?${query}`;
  }

  if (method === 'GET') {
    return axios.get(uri);
  }
}
