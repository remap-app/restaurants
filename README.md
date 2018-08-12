# restaurants

ReMap Restaurants API Microservice

|        | Status |
| :----: | :----: |
| master | [![CircleCI](https://circleci.com/gh/remap-app/restaurants/tree/master.svg?style=svg&circle-token=086672baf7498fc5cae959a3e715f25bc28d0b49)](https://circleci.com/gh/remap-app/restaurants/tree/master) |
| deployment/staging | [![CircleCI](https://circleci.com/gh/remap-app/restaurants/tree/deployment%2Fstaging.svg?style=svg&circle-token=086672baf7498fc5cae959a3e715f25bc28d0b49)](https://circleci.com/gh/remap-app/restaurants/tree/deployment%2Fstaging) |
| deployment/production | [![CircleCI](https://circleci.com/gh/remap-app/restaurants/tree/deployment%2Fproduction.svg?style=svg&circle-token=086672baf7498fc5cae959a3e715f25bc28d0b49)](https://circleci.com/gh/remap-app/restaurants/tree/deployment%2Fproduction) |

## Endpoints

### Restaurants

```http
GET /
```

#### Query parameters

- latitude
- longitude
- range
- page
- per_page

### Restaurant

```http
GET /:id
```
