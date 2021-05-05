# Setup
- npm install

# Reproduction
- npm run start:dev
- open Bloom RPC
- import the proto in folder `proto/auth/session.proto`
- use this on request
```
{
  "device_data": {
    "device_name": "",
    "device_type": "",
    "device_os": "",
    "device_token": "",
    "app_version": "",
    "latitude": "",
    "longitude": ""
  },
  "language": "",
  "ip": ""
}
```

# Expectation Response
```
{
  "error": "3 INVALID_ARGUMENT: device_name should not be empty,device_type should not be empty,device_os should not be empty,app_version should not be empty,latitude must be a latitude string or number,longitude must be a longitude string or number"
}
```
for expectation response, you can `uncomment @UsePipes` on `app.controller.ts` and comment `app.useGlobalPipes` on `main.ts`