import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://greenmainframe.dev/');
  sleep(1);
}