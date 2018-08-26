# restaurants

ReMap Restaurants Microservice

|        | Status |
| :----: | :----: |
| master | [![CircleCI](https://circleci.com/gh/remap-app/restaurants/tree/master.svg?style=svg&circle-token=086672baf7498fc5cae959a3e715f25bc28d0b49)](https://circleci.com/gh/remap-app/restaurants/tree/master) |
| deployment/staging | [![CircleCI](https://circleci.com/gh/remap-app/restaurants/tree/deployment%2Fstaging.svg?style=svg&circle-token=086672baf7498fc5cae959a3e715f25bc28d0b49)](https://circleci.com/gh/remap-app/restaurants/tree/deployment%2Fstaging) |
| deployment/production | [![CircleCI](https://circleci.com/gh/remap-app/restaurants/tree/deployment%2Fproduction.svg?style=svg&circle-token=086672baf7498fc5cae959a3e715f25bc28d0b49)](https://circleci.com/gh/remap-app/restaurants/tree/deployment%2Fproduction) |

## Response

```typescript
interface IResponse {
  id: string;
  name: string;
  name_kana: string;
  latitude: string;
  longitude: string;
  url: string;
  url_mobile?: string;
  images: string[];
  coupon_url: { desktop?: string, mobile?: string };
  tel?: string;
  opening_times?: string;
  catchphrase?: string;
  description?: string;
  access?: string;
  holiday?: string;
  credit_card?: string;
  non_smoking?: string;
  lunch?: string;
  children?: string;
}
```

## Endpoints

### Restaurants

```http
GET /?latitude=${LATITUDE}&longitude=${LONGITUDE}
```

```http
GET /?id=${ID_0},${ID_1}
```

#### Query parameters

- latitude
- longitude
- range
- page
- per_page
- id

### Restaurant

```http
GET /:id
```
