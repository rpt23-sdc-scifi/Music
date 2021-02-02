import http from 'k6/http';

import { Rate } from 'k6/metrics';

import { sleep } from 'k6';

let errorRate = new Rate ('errorRate');

// export let options = {
//   stages: [
//     { duration: '1m', target: 10 }
//     // { duration: '1m', target: 10 }, 
//     // { duration: '1m', target: 200 },
//     // { duration: '30s', target: 300 },
//     // { duration: '30s', target: 400 },
//     // { duration: '30s', target: 600 },
//     // { duration: '30s', target: 500 },
//     // { duration: '1m', target: 0 }, 
//   ],
// }
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};
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



/*
Testing options / notes

 //    'http_req_duration': [{threshold: 'p(90) < 2000', abortOnFail: true, delayAbortEval: '5s' }]

//   //maximum requests per second
//   rps: 100

//virtual user start
//   startVUs: 1
 */