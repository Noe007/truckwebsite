// config/default.json
const request = require('request');
const config = require('config');

module.exports =

    {
        getVehicle: function (productId, cb) {

            request(
                config.get("vehicleApi.vehicle") + productId, {
                    json: true
                }, (err, res, body) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(body);
                    cb(body);
                });

            // return "this is a truck with this ProductId " + body;

        },

        getVehicles: function (itemsPerPage, pageNumber,cb) {

            request(
                config.get("vehicleApi.vehicles")
                .replace("ITEMS_PER_PAGE", itemsPerPage)
                .replace("PAGE_NUMBER", pageNumber)

                , {
                    json: true
                }, (err, res, body) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(" get vehicles");
                    cb(
                        body.Data.Results.Results.Results,
                        body.Data.Count
                        );
                });

            return "All trucks from itemsPerPage: " + itemsPerPage + " - pageNumber: " + pageNumber;
        },
        getLocation: function (locationId) {
            return "this is a truck with this ProductId " + locationId;
        },
        getLocations: function (itemsPerPage, pageNumber) {
            return "All locations from itemsPerPage: " + itemsPerPage + " - pageNumber: " + pageNumber;
        },
        getAllVehicleOf: function (locationId) {
            return "All trucks from this location: " + itemsPerPage + " - pageNumber: " + pageNumber;
        }

    }


// // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }