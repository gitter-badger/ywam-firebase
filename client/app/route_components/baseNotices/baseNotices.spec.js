import BaseNoticesModule from './baseNotices'
import BaseNoticesController from './baseNotices.controller';
import BaseNoticesComponent from './baseNotices.component';
import BaseNoticesTemplate from './baseNotices.html';

describe('BaseNotices', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseNoticesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseNoticesController();
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
      expect(BaseNoticesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseNoticesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseNoticesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseNoticesController);
      });
  });
});
