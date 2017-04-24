import template from './userPhotoUpload.html';
import controller from './userPhotoUpload.controller';
import './userPhotoUpload.styl';

let userPhotoUploadComponent = {
  restrict: 'E',
  bindings: {userId:'=', onCompleate:'='},
  template,
  controller
};

export default userPhotoUploadComponent;
