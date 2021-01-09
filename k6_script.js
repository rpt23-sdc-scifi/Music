import http from 'k6/http';

import { check, sleep } from 'k6';

export let options = {
  thresholds : {
       'http_req_duration': ['p(90) < 500']

  },
  stages: [
    { duration: '120s', target: 3500 }
  ],
  startVUs: 2000
};
export default function () {
  let max = 10000000;
  let min = 9000000;
  let randomId = Math.random() * (max - min) + min;
  let res = http.get(`http://localhost:3005/api/song/${randomId}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
