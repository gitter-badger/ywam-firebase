import FundEditModule from './fundEdit'
import FundEditController from './fundEdit.controller';
import FundEditComponent from './fundEdit.component';
import FundEditTemplate from './fundEdit.html';

describe('FundEdit', () => {
  let $rootScope, makeController;

  beforeEach(window.module(FundEditModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new FundEditController();
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
      expect(FundEditTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = FundEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FundEditTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FundEditController);
      });
  });
});
