// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'

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

  group('page_1 - https://greenmainframe.dev/checkout', function () {
    response = http.get('https://greenmainframe.dev/checkout', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1)

    response = http.get('https://auth-api.greenmainframe.dev/api/v1/auth/me', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.options('https://auth-api.greenmainframe.dev/api/v1/auth/me', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'authorization',
        'access-control-request-method': 'GET',
        origin: 'https://greenmainframe.dev',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.get('https://auth-api.greenmainframe.dev/api/v1/auth/me', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.options('https://auth-api.greenmainframe.dev/api/v1/auth/me', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'authorization',
        'access-control-request-method': 'GET',
        origin: 'https://greenmainframe.dev',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.get(
      'https://cart-api.greenmainframe.dev/carts/ece95bd4-fd67-45f0-a0d5-5c26641c583d',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.options(
      'https://cart-api.greenmainframe.dev/carts/ece95bd4-fd67-45f0-a0d5-5c26641c583d',
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
    sleep(1)

    response = http.get('https://checkout-api.greenmainframe.dev/payment-methods', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.options('https://checkout-api.greenmainframe.dev/payment-methods', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'authorization',
        'access-control-request-method': 'GET',
        origin: 'https://greenmainframe.dev',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.get('https://services-api.greenmainframe.dev/api/v1/services/amount', {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
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
    sleep(1)

    response = http.post(
      'https://checkout-api.greenmainframe.dev/checkout',
      '{"cvc":"123","number":"4242424242424242","exp_month":12,"exp_year":29,"product_id":"price_1JNYNBA2rE4uDkXkuJD3oroL","domain":"lukas.example.com","name":"Lukas Domingos","email":"lukas.domingos+91919@webera.com"}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
          'content-type': 'application/json',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.options('https://checkout-api.greenmainframe.dev/checkout', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'POST',
        origin: 'https://greenmainframe.dev',
        'sec-fetch-mode': 'cors',
      },
    })
    sleep(1)

    response = http.del(
      'https://cart-api.greenmainframe.dev/carts/ece95bd4-fd67-45f0-a0d5-5c26641c583d',
      null,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.options(
      'https://cart-api.greenmainframe.dev/carts/ece95bd4-fd67-45f0-a0d5-5c26641c583d',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-method': 'DELETE',
          origin: 'https://greenmainframe.dev',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    sleep(1)
  })

  group('page_2 - https://greenmainframe.dev/checkout/success/76', function () {
    response = http.get('https://greenmainframe.dev/checkout/success/76', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1)
    response = http.get('https://auth-api.greenmainframe.dev/api/v1/auth/me', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
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
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
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
    response = http.patch('https://checkout-api.greenmainframe.dev/subscriptions/76', null, {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c19MbG82eWpRN0tiR2lFYiIsInV1aWQiOiJlY2U5NWJkNC1mZDY3LTQ1ZjAtYTBkNS01YzI2NjQxYzU4M2QiLCJmaXJzdF9uYW1lIjoiTHVrYXMiLCJsYXN0X25hbWUiOiJEb21pbmdvcyIsImVtYWlsIjoibHVrYXMuZG9taW5nb3MrOTE5MTlAd2ViZXJhLmNvbSIsImRvbWFpbiI6bnVsbCwiaWF0IjoxNjUzNzEwOTEwLCJleHAiOjE2NTM3MTQ1MTB9.Ryc3jEaot8ZuP4Uz6hjrSAIv6Tg2XEjWLzajGDth_cM',
        'content-type': 'application/x-www-form-urlencoded',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    response = http.options('https://checkout-api.greenmainframe.dev/subscriptions/76', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'authorization',
        'access-control-request-method': 'PATCH',
        origin: 'https://greenmainframe.dev',
        'sec-fetch-mode': 'cors',
      },
    })
    sleep(1)
  })
}
