'use strict';

// [START import]
const functions = require('firebase-functions');
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
function banner(event){
// [END generateThumbnailTrigger]
  // [START eventAttributes]
  const object = event.data; // The Storage object.

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exits' (for file/folder deletions).
  const pathArray = filePath.split('/')
  const schoolId = pathArray[1]
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }
  
    // Get the file name.
  const fileName = pathArray.pop();
  // Exit if the image is not right file.
   if (!fileName.startsWith('banner_1080.jpg')) {
    console.log('banner_1080.jpg');
    return;
  }


  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_100_')) {
    console.log('Already a Thumbnail.');
    return;
  }

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }
  // [END stopConditions]

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
    return spawn('convert', [tempFilePath, '-thumbnail', '100x100>', tempFilePath]).then(() => {
      console.log('Thumbnail created at', tempFilePath);

      // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
      const thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, `$1thumb_100_${timestamp}_$2`);
   
      // Uploading the thumbnail.
      return bucket.upload(tempFilePath, {
        destination: thumbFilePath
      }).then(() => {
          console.log('Thumbnail uploaded to Storage at for school',schoolId ,thumbFilePath);

        admin.database().ref('/schools/'+schoolId+'/public/banner_100').set(thumbFilePath)
        admin.database().ref('/schools/'+schoolId+'/public/banner_1080').set(filePath)


        });
    });
  });
  // [END thumbnailGeneration]
};
// [END generateThumbnail]

exports.banner = banner