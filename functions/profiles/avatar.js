'use strict';

// [START import]

const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;

const admin = require('../config.js').admin;

// [END import]

// [START generateThumbnail]
/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 */
// [START generateThumbnailTrigger]
function avatar(event){
// [END generateThumbnailTrigger]
  // [START eventAttributes]
  const object = event.data; // The Storage object.

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exits' (for file/folder deletions).
  const pathArray = filePath.split('/')
  const userId = pathArray[1]
  // [END eventAttributes]

  
  const fileName = pathArray.pop();


  // [START thumbnailGeneration]
  // Download file from bucket.
  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = `/tmp/${fileName}`;
  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    console.log('Image downloaded locally to', tempFilePath);
   const timestamp =  new Date().getTime()
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]).then(() => {
      console.log('Thumbnail created at', tempFilePath);

      // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
      const thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, `$1thumb_200_${timestamp}_$2`);
   
      // Uploading the thumbnail.
      return bucket.upload(tempFilePath, {
        destination: thumbFilePath
      }).then(() => {
          console.log('Thumbnail uploaded to Storage at for user',userId ,thumbFilePath);

         admin.database().ref('/profiles/'+userId+'/contact/avatar_200').set(thumbFilePath)
         admin.database().ref('/profiles/'+userId+'/contact/avatar_1080').set(filePath)
    

        });
    });
  });
  // [END thumbnailGeneration]
};
// [END generateThumbnail]

exports.avatar = avatar