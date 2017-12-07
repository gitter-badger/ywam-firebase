import ChangeUserPhotoModule from './changeUserPhoto'
import ChangeUserPhotoController from './changeUserPhoto.controller';
import ChangeUserPhotoComponent from './changeUserPhoto.component';
import ChangeUserPhotoTemplate from './changeUserPhoto.html';

describe('ChangeUserPhoto', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ChangeUserPhotoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ChangeUserPhotoController();
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
      expect(ChangeUserPhotoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ChangeUserPhotoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ChangeUserPhotoTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ChangeUserPhotoController);
      });
  });
});
