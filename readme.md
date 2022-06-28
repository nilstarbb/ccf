# Canada Clean Fuels Full Stack Design Assignment
URL: https://agile-river-35239.herokuapp.com/

## Back-End
1. Read both CSV files and store them in two separate tables in a remote datastore.
2. Create three APIs:
   1. API1: Retrieve all trips or one trip.
   2. API2: Add a delivery for an existing trip.
   3. API3: Delete a delivery.
  
### Read from CSV files

Import CSV to database:
- trips: `POST /api/trips/init`
- deliverys: `POST /api/deliverys/init`

Remove existing data in database:
- trips: `POST /api/trips/reset`
- deliverys: `POST /api/deliverys/reset`

### Retrieve all trips

Retrive all trips: `GET /api/trips`

Response:
```json
[{"trip_id":"136764","driver":"Luke","vehicle":"14","vehicle2":"","qty":35000,"start_timestamp":"2022-05-13T17:42:00.000Z","end_timestamp":"2022-05-14T01:17:00.000Z","id":"62bb05cc98e98ca365d9a99d"},{"trip_id":"136873","driver":"Marty","vehicle":"16","vehicle2":"","qty":10100,"start_timestamp":"2022-05-17T10:31:00.000Z","end_timestamp":"2022-05-17T16:34:00.000Z","id":"62bb05cc98e98ca365d9a99e"},{"trip_id":"136998","driver":"Xavier","vehicle":"T18","vehicle2":"T430","qty":40000,"start_timestamp":"2022-05-20T03:07:00.000Z","end_timestamp":"2022-05-20T09:02:00.000Z","id":"62bb05cc98e98ca365d9a99f"}]
```

### Retrieve one trip

Retrive one trip by `trip_id`: `GET /api/trips/:trip_id`

Response of `GET /api/trips/136764`
```json
{"trip_id":"136764","driver":"Luke","vehicle":"14","vehicle2":"","qty":35000,"start_timestamp":"2022-05-13T17:42:00.000Z","end_timestamp":"2022-05-14T01:17:00.000Z","id":"62bb05cc98e98ca365d9a99d"}
```

### Add a delivery for an existing trip

Add a delivery for an existing trip: `POST /api/deliverys`

Request body parameters:
```js
trip_id,
delivery_id,
location,
city,
qty_delivered
```

### Delete a delivery

Delete a delivery: `DELETE /api/deliverys/:id`

Example: `DELETE /api/deliverys/62bafeb5205e58eebbbc3629`

`delivery_id` in original csv file are duplicated, so here we use unique `id` generated by database instead.

## Front-End

Due to time limit, this part is not completed yet.

The features this part plans to have:
- An index page to display existing trips & deliverys.
- Dynamic sorting table to display data.
- A form for adding new delivery.
- Delete delivery by clicking a `delete` button.
- Double confrimation when deleting an entry.


## Further improvement
- User authorization.
- Token-based API call.
- Validate requests.