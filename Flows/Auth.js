// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'

import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { duration: '2m', target: 100 }, // below normal load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // normal load
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 }, // around the breaking point
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 }, // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  const vars = {}

  group('page_1 - https://greenmainframe.dev/auth', function () {
    response = http.get('https://greenmainframe.dev/auth', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1)

    response = http.post(
      'https://auth-api.greenmainframe.dev/api/v1/auth/login',
      '{"email":"lukas.domingos+91919@webera.com","password":"#Flamengo123"}',
      {
        headers: {
          'content-type': 'application/json',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    vars['access_token1'] = jsonpath.query(response.json(), '$.token.access_token')[0]

    response = http.options('https://auth-api.greenmainframe.dev/api/v1/auth/login', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: 'https://greenmainframe.dev',
        'sec-fetch-mode': 'cors',
      },
    })
    sleep(1)
  })

  group('page_2 - https://greenmainframe.dev/auth/dashboard', function () {
    response = http.get('https://greenmainframe.dev/auth/dashboard', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1)
    response = http.get('https://notifications-gateway.greenmainframe.dev/api/v1/notifications', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['access_token1']}`,
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    response = http.get('https://auth-api.greenmainframe.dev/api/v1/auth/me', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['access_token1']}`,
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    response = http.options(
      'https://notifications-gateway.greenmainframe.dev/api/v1/notifications',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          origin: 'https://greenmainframe.dev',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    response = http.options('https://auth-api.greenmainframe.dev/api/v1/auth/me', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'authorization',
        'access-control-request-method': 'GET',
        origin: 'https://greenmainframe.dev',
        'sec-fetch-mode': 'cors',
      },
    })
    sleep(1)
    response = http.get('https://services-api.greenmainframe.dev/api/v1/services/amount', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['access_token1']}`,
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    response = http.options(
      'https://services-api.greenmainframe.dev/api/v1/services/amount',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          origin: 'https://greenmainframe.dev',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    response = http.get('https://payment-api.greenmainframe.dev/api/v1/subscriptions', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['access_token1']}`,
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    response = http.options('https://payment-api.greenmainframe.dev/api/v1/subscriptions', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'authorization',
        'access-control-request-method': 'GET',
        origin: 'https://greenmainframe.dev',
        'sec-fetch-mode': 'cors',
      },
    })
  })
}
