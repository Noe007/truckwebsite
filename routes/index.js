var express = require('express');
var router = express.Router();
let uvsApi = require('../private_modules/uvs_api/uvsApi')

/* GET single vehicle page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', {
    title: 'Rtrucks'
  });
});


/* GET single vehicle page. */
router.get('/vehicle/:productId', function (req, res, next) {
  uvsApi.getVehicle(req.params.productId, function(item){
    let vehicle = item.Data.Results.Results.Results[0]
    // .Results.DisplayName

    res.render('pages/vehicle', {
      vehicle: vehicle,
      ampLink :req.protocol + '://' + req.get('host') + "/amp"+req.originalUrl
    });
  });


});

/* GET single vehicle page. */
router.get('/amp/vehicle/:productId', function (req, res, next) {
  uvsApi.getVehicle(req.params.productId, function(item){
    let vehicle = item.Data.Results.Results.Results[0]
    // .Results.DisplayName

    res.render('pages/vehicle', {
      vehicle: vehicle,
      ampLink :req.protocol + '://' + req.get('host') + "/amp"+req.originalUrl
    });
  });


});

/* GET vehicles page. */
router.get('/vehicles', function (req, res, next) {


  let itemsPerPage = 
  (req.query.itemsPerPage == null) ? 10:  parseInt(req.query.itemsPerPage)
  
  let pageNumber = 
  (req.query.pageNumber == null) ? 1:  parseInt(req.query.pageNumber);

  let vehicles = uvsApi.getVehicles(
    itemsPerPage,
    pageNumber
  , function(vehicles,count){
    
    res.render('pages/vehicles', {
      title: 'Express',
      vehicles: vehicles,
      count: count
    });

    
  });

});

/* GET single location page. */
router.get('/location/:locationId',
  function (req, res, next) {
    let location = uvsApi.getLocation(req.params.locationId);
    res.render('pages/location', {
      title: 'Express',
      location: location
    });


  }
);

/* GET locations page. */
router.get(
  '/locations/',
  function (req, res, next) {
    let locations = uvsApi.getLocations(
      req.params.itemsPerPage,
      req.params.pageNumber
    );

    res.render('pages/locations', {
      title: 'Express',
      locations: locations
    });

  });

/* GET vehicles page. */
router.get('/allVehicleOf:locationId', function (req, res, next) {
  
  let location = uvsApi.getAllVehicleOf(
    req.params.locationId
  );

  res.render('pages/vehicles', {
    title: 'Express',
    vehicles: location
  });
});



module.exports = router;




