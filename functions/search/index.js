'use strict';

const functions = require('firebase-functions');
const admin = require('../config.js').admin;


if(functions.config().algolia){
// Authenticate to Algolia Database.
// TODO: Make sure you configure the `algolia.app_id` and `algolia.apiKey` Google Cloud environment variables.
const algoliasearch = require('algoliasearch');
const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);

// Name fo the algolia index for Blog posts content.
const ALGOLIA_POSTS_INDEX_NAME = 'profiles';

// Updates the search index when new blog entries are created or updated.
exports.indexProfile = functions.database.ref('/profiles/{userId}/com').onWrite(event => {
  const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
  const firebaseObject = {}
    firebaseObject.first_name = event.data.val().first_name;
    firebaseObject.last_name = event.data.val().last_name;
    firebaseObject.email = event.data.val().email;
    firebaseObject.home_phone = event.data.val().home_phone;
    firebaseObject.mobile_phone = event.data.val().mobile_phone;

  firebaseObject.objectID = event.params.userId;

  return index.saveObject(firebaseObject)
//   .then(
//       () => event.data.adminRef.child('last_index_timestamp').set(
//          Date.parse(event.timestamp).getTime()));
});

// Starts a search query whenever a query is requested (by adding one to the `/search/queries`
// element. Search results are then written under `/search/results`.
exports.queries = functions.database.ref('/search/queries/{queryid}').onWrite(event => {
  const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);

  const query = event.data.val().query;
  const key = event.data.key;

  return index.search(query).then(content => {
    const updates = {
    //   '/search/last_query_timestamp':   Date.parse(event.timestamp).getTime()
    };
    updates[`/search/results/${key}`] = content;
    return admin.database().ref().update(updates);
  });
});

}