import ReferenceDisplayModule from './referenceDisplay'
import ReferenceDisplayController from './referenceDisplay.controller';
import ReferenceDisplayComponent from './referenceDisplay.component';
import ReferenceDisplayTemplate from './referenceDisplay.html';

describe('ReferenceDisplay', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ReferenceDisplayModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ReferenceDisplayController();
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
      expect(ReferenceDisplayTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ReferenceDisplayComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ReferenceDisplayTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ReferenceDisplayController);
      });
  });
});
