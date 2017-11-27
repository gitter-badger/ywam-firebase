'use strict'


var functions = require('firebase-functions');

// exports.profiles = require('./profiles/index.js')
// exports.funds = require('./funds/index.js')
exports.fund_scheduled_bills = require('./fund_scheduled_bills/index.js')
// exports.fund_subscriptions = require('./fund_subscriptions/index.js')
exports.references = require('./references/index.js')
exports.reference_tokens = require('./reference_tokens/index.js')
exports.search = require('./search/index.js')
exports.mailgun = require('./mailgun/index.js')
// exports.mailchimp = require('./mailchimp/index.js')
exports.slack = require('./slack/index.js')
exports.paypal = require('./paypal/index.js')
exports.stripe = require('./stripe/index.js')
exports.plaid = require('./plaid/index.js')
<<<<<<< Updated upstream
exports.finance_accounts = require('./finance_accounts/index.js')
exports.donors = require('./donors/index.js')
exports.crm = require('./crm/index.js')
=======
// exports.finance_accounts = require('./finance_accounts/index.js')

/** EXPORT ALL FUNCTIONS
 *
 *   Loads all `.f.js` files
 *   Exports a cloud function matching the file name
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 *     https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da
 */
const glob = require('glob')
const camelCase = require('camelcase')

const files = glob.sync('./**/*.f.js', { cwd: __dirname, ignore: './node_modules/**' })
for (let f = 0, fl = files.length; f < fl; f++) {
  const file = files[f]
  const functionName = camelCase(file.slice(0, -5).split('/').join('_')) // Strip off '.f.js'
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(file)
  }
}

>>>>>>> Stashed changes



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
