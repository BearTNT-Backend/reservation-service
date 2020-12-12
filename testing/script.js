// run in terminal; k6 run script.js
// add virtual users: k6 run --vus 10 --duration 30s script.js


import http from "k6/http";
import { sleep } from 'k6';


export default function() {
    let response = http.get("http://localhost:3001/listing/9500000");
    sleep(1);
}