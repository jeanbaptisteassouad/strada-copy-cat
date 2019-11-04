# strada-copy-cat

## Description

Strada-copy-cat is a two endpoints REST API that can give you statistics on your runs.

The first endpoint (POST /addRun) lets you add one of your run to the system.

The second endpoint (GET /statsBetween) lets you get statistics about all the runs you made between a start_date and an end_date. If a run is not fully included in the interval, the run will still be counted, the number of kilometers and of calories will be interpolate linearly.

## API

Endpoint | Method | Query | Return
----- | ----- | ----- | -----
/addRun | POST | __start_date__ _:: UnixEpoch_, __end_date__ _:: UnixEpoch_, __kilo__ _:: PositiveNumber_, __calo__ _:: PositiveNumber_ | {__id__ _:: PositiveInteger_}
/statsBetween | GET | __start_date__ :: _UnixEpoch_, __end_date__ :: _UnixEpoch_ | {__average_kilo__ _:: PositiveNumber_, __average_calo__ _:: PositiveNumber_}

## How to ?

To test the api run :

```
yarn test
```

To run on your computer :

```
yarn start
```


