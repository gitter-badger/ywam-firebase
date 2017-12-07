import RefRequestModule from './refRequest'
import RefRequestController from './refRequest.controller';
import RefRequestComponent from './refRequest.component';
import RefRequestTemplate from './refRequest.html';

describe('RefRequest', () => {
  let $rootScope, makeController;

  beforeEach(window.module(RefRequestModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new RefRequestController();
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
      expect(RefRequestTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = RefRequestComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(RefRequestTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(RefRequestController);
      });
  });
});
