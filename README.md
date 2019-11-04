# strada-copy-cat

Strada-copy-cat is a two endpoints REST API that can give you statistics on your runs.

The first endpoint (POST /addRun) lets you add your run to the system.

The second endpoint (GET /statsBetween) lets you get statistics about all the runs you made between a start_date and an end_date. If a run is not fully included in the interval, the run will still be counted, the number of kilometers and of calories will be interpolate linearly.

Endpoint | Method | Query
-------- | -------------
/addRun | POST | start_date :: 
/statsBetween | GET

