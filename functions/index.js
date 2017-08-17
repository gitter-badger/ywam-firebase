var functions = require('firebase-functions');

exports.applications = require('./applications/index.js')
exports.profiles = require('./profiles/index.js')
exports.funds = require('./funds/index.js')
exports.fund_scheduled_bills = require('./fund_scheduled_bills/index.js')
exports.fund_subscriptions = require('./fund_subscriptions/index.js')
exports.schools = require('./schools/index.js')
exports.references = require('./references/index.js')
exports.reference_tokens = require('./reference_tokens/index.js')
exports.search = require('./search/index.js')
exports.mailgun = require('./mailgun/index.js')
exports.mailchimp = require('./mailchimp/index.js')
exports.slack = require('./slack/index.js')
exports.auth = require('./auth/index.js')
// exports.braintree = require('./braintree/index.js')
exports.paypal = require('./paypal/index.js')
exports.stripe = require('./stripe/index.js')
exports.plaid = require('./plaid/index.js')
exports.finance_accounts = require('./finance_accounts/index.js')
exports.donors = require('./donors/index.js')
exports.crm = require('./crm/index.js')

var school_banner = require('./schools/banner.js')
var profile_avatar = require('./profiles/avatar.js')

// watch for storage bucket changes.. 
// hopefully in the future we can watch for a specific file and not just ALL changes

exports.storageChanges = functions.storage.object().onChange(event => {

  const object = event.data; // The Storage object.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exits' (for file/folder deletions).
  const pathArray = filePath.split('/')
  
    // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }
 
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }
  
    // Get the file name.
   const fileName = pathArray.pop();
 
    if (fileName.startsWith('banner_1080.jpg')) {
       
        console.log('banner_1080.jpg');
      return school_banner.banner(event)
        //return;
    }else if(fileName.startsWith('avatar.jpg')){
         console.log('avatar.jpg');
        return profile_avatar.avatar(event)

    }else{
        return 
    }

});
