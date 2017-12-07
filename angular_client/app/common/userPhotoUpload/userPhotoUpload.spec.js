import UserPhotoUploadModule from './userPhotoUpload'
import UserPhotoUploadController from './userPhotoUpload.controller';
import UserPhotoUploadComponent from './userPhotoUpload.component';
import UserPhotoUploadTemplate from './userPhotoUpload.html';

describe('UserPhotoUpload', () => {
  let $rootScope, makeController;

  beforeEach(window.module(UserPhotoUploadModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new UserPhotoUploadController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(UserPhotoUploadTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = UserPhotoUploadComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(UserPhotoUploadTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(UserPhotoUploadController);
      });
  });
});
