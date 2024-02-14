'use strict';

const express = require('express');
const morgan = require('morgan');

const { getOrCreateUser } = require("./handlers/users/user");

const { profile } = require("./handlers/profile/profile");
const { getProfileFromUserId } = require("./handlers/profile/ProfileApi");
const { updateProfile } = require("./handlers/profile/updateProfile");
const { deleteProfile } = require("./handlers/profile/deleteProfile");

const { createRoute } = require("./handlers/route/createRoute");
const { displayRoute } = require("./handlers/route/displayRoute");
const { allRoutes } = require("./handlers/route/allRoutes");
const { updateRoute } = require("./handlers/route/updateRoute");
const { deleteRoute } = require("./handlers/route/deleteRoute");

// Get the list of all the carriers
const { carriersList } = require("./handlers/carriers/carriersList");

// Client
const { clientProfile } = require("./handlers/clients/clientProfile");
const { bulkRequest } = require("./handlers/clients/bulkRequest");
const { BulkRequests } = require("./handlers/clients/BulkRequests");
const { theBulkRequestId } = require("./handlers/clients/theBulkRequestId");
const { allCarrierRoutes } = require("./handlers/clients/allCarrierRoutes");
const { myBulkRequestsClient } = require("./handlers/clients/myBulkRequestsClient");

// Mails
const { newMail } = require("./handlers/mail/newMail");
const { getMail } = require("./handlers/mail/getMail");
const { getUserMails } = require("./handlers/mail/getUserMails");
const { patchMail } = require("./handlers/mail/patchMail");

// Tracking Carrier
const { trackingDocNew } = require("./handlers/tracking/trackingDoc");
const { allTrackingDocuments } = require("./handlers/tracking/allTrackingDocuments");
const { aTrackingDocumentUpdate } = require("./handlers/tracking/aTrackingDocumentUpdate");
const { aTrackingDocumentDeleted } = require("./handlers/tracking/aTrackingDocumentDeleted");

// Tracking Client
const { allClientTrackingDocs } = require("./handlers/tracking/allClientTrackingDocs");

// Feedback Client
const { feedback } = require("./handlers/clients/feedback/feedback");

// Feedback Carrier
const { feedbacksRanking } = require("./handlers/clients/feedback/feedbacksRanking");
const { feedbackOnTrackingId } = require('./handlers/clients/feedback/feedbackOnTrackingId');

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints

  // Users
  .post('/users', getOrCreateUser)

  // Profile
  .post('/client/profile', clientProfile) // Add profile of the user
  .get('/user/profile/:userId', getProfileFromUserId) // Retrieve the user profile based on the userId.
  .patch('/carrier/profile', updateProfile) // Update the profile of the user.
  .delete('/carrier/profile/:userId', deleteProfile) // Delete profile of the user.

  // Carrier
  .post('/carrier/route', createRoute) // Add the route created by the carrier
  .get('/carrier/route/view/:routeId', displayRoute) // Display a single (specific) route based on the ID of this route that is the ObjectId of the Route in the collection Routes.
  .get('/carrier/route/views/allroutes/:carrierId', allRoutes) // Allows to display all the routes stored in the collection Routes for a specific carrier based on the id of the carrier.
  .patch('/carrier/route/mod/:routeId', updateRoute) // Allows to modify a specific route in the collection Routes.
  .delete('/carrier/route/del/:routeId', deleteRoute) // Allows to delete the route created by the carrier from the collection Routes 
  .post('/carrier/bulk/request', bulkRequest) // Allows to add the request from the client that he created into the collection ClientBulkRequest.
  .get('/carrier/bulk/requests', BulkRequests)
  .get('/carrier/bulks/:bulkRequestId', theBulkRequestId) // Allows to retrieve a specific request based on its ObjectId.
  .post('/carrier/profile', profile)

  // Client
  .get('/client/route/views/allroutes', allCarrierRoutes) // Allows to find all the routes.

  // Mails
  .post('/mail/new', newMail) // To add a mail in the collection Mails.
  .get('/mail/carrierreply/:bulkRequestId', getMail) // To get all the mails specific to the ID of a request.
  .patch('/mail/mod/:mailId', patchMail)
  .get('/mail/client/mybulkrequest/view/:clientid', myBulkRequestsClient) // To get all the requests created by a specific client.
  .get('/mails/get/:userId/:mailOption', getUserMails) // To get all the mails at destination of a specific user regardless the type.

  // Carrier List
  .get('/carriers/all', carriersList) // To get the list of the carriers.

  // Tracking Carrier
  .post('/tracking/trackingDoc', trackingDocNew) // To create the tracking document.
  .get('/tracking/alltrackingdocs/:carrierId', allTrackingDocuments) // To get all the tracking documents created by a specific carrier.
  .patch('/tracking/alltrackingdocs', aTrackingDocumentUpdate) // To update the tracking status of a specific tracking document.
  .delete('/tracking/alltrackingdocs/:trackingDocId', aTrackingDocumentDeleted) // To delete a tracking document.S

  // Tracking Client
  .get('/tracking/client/:clientid', allClientTrackingDocs)

  // Feedback Client
  .post('/feedback', feedback)
  .get('/feedback/:trackingId', feedbackOnTrackingId)

  // Feedback Carrier
  .get('/feedbacks/carrier/:carrierId', feedbacksRanking) // Allows to retrieve all the feedbacks of a specific carrier based on its carrier id.

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
