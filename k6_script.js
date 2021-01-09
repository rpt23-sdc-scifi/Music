import http from 'k6/http';

import { Rate } from 'k6/metrics';

import { sleep } from 'k6';

let errorRate = new Rate ('errorRate');

export let options = {
  thresholds : {
/* prerequisites requests  1-5 min duration 1 user 
   threshold of 90% of requests must be within 500 ms and 99% within 1 min
   error rate should be 1 percent over 2 min
*/
   'http_req_duration':  ['p(90) < 500', 'p(99) < 1000'],
   'errorRate': [{threshold: 'rate < 0.05', abortOnFail: true, delayAbortEval: '30s'}]
    
  },
  stages: [
    { duration: '30s', target: 1 },
    { duration: '60s', target: 10 },
    { duration: '30s', target: 5 },
  ],

};
export default function () {
  let max = 9999998;
  let min = 1;
  let randomId = Math.random() * (max - min) + min;
  let res = http.get(`http://localhost:3005/api/song/${randomId}`);
  
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