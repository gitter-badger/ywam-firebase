import PassportInfoModule from './passportInfo'
import PassportInfoController from './passportInfo.controller';
import PassportInfoComponent from './passportInfo.component';
import PassportInfoTemplate from './passportInfo.html';

describe('PassportInfo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PassportInfoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PassportInfoController();
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
      expect(PassportInfoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PassportInfoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PassportInfoTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PassportInfoController);
      });
  });
});
