import StudentPhotosModule from './studentPhotos'
import StudentPhotosController from './studentPhotos.controller';
import StudentPhotosComponent from './studentPhotos.component';
import StudentPhotosTemplate from './studentPhotos.html';

describe('StudentPhotos', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StudentPhotosModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StudentPhotosController();
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
      expect(StudentPhotosTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StudentPhotosComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StudentPhotosTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StudentPhotosController);
      });
  });
});
