import http from 'k6/http';

import { Rate } from 'k6/metrics';

import { sleep } from 'k6';

let errorRate = new Rate ('errorRate');

export let options = {
  stages: [
    { duration: '15s', target: 10 },
    { duration: '15s', target: 100 },
    { duration: '15s', target: 300 },
    { duration: '15s', target: 400 },
    { duration: '30s', target: 500 },
    { duration: '30s', target: 0 }, 
  ],
}

export default function () {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  let max = 100000;
  let min = 1;
  let randomId = getRandomInt(min, max);
  let res = http.get(`http://localhost:3005/songdata/${randomId}`);
  
  errorRate.add(res.status != 200);

  sleep(1);
}