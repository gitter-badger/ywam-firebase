var functions = require('firebase-functions');

exports.applications = require('./applications/index.js')
exports.references = require('./references/index.js')
exports.search = require('./search/index.js')

var school_banner = require('./schools/banner.js')
var profile_avatar = require('./profiles/avatar.js')

// watch for storage bucket changes.. 
// hopefully in the future we can watch for a specific file and not just ALL changes

/*exports.storageChanges = functions.storage.object().onChange(event => {

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
// [END generateThumbnail]*/