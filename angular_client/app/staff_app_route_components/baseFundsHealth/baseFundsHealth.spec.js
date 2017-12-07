import BaseFundsHealthModule from './baseFundsHealth'
import BaseFundsHealthController from './baseFundsHealth.controller';
import BaseFundsHealthComponent from './baseFundsHealth.component';
import BaseFundsHealthTemplate from './baseFundsHealth.html';

describe('BaseFundsHealth', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseFundsHealthModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseFundsHealthController();
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
      expect(BaseFundsHealthTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseFundsHealthComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseFundsHealthTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseFundsHealthController);
      });
  });
});
