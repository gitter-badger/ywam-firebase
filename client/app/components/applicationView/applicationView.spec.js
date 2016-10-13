import ApplicationViewModule from './applicationView'
import ApplicationViewController from './applicationView.controller';
import ApplicationViewComponent from './applicationView.component';
import ApplicationViewTemplate from './applicationView.html';

describe('ApplicationView', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ApplicationViewModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ApplicationViewController();
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
      expect(ApplicationViewTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ApplicationViewComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ApplicationViewTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ApplicationViewController);
      });
  });
});
