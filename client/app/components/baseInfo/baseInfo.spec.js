import BaseInfoModule from './baseInfo'
import BaseInfoController from './baseInfo.controller';
import BaseInfoComponent from './baseInfo.component';
import BaseInfoTemplate from './baseInfo.html';

describe('BaseInfo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseInfoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseInfoController();
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
      expect(BaseInfoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseInfoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseInfoTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseInfoController);
      });
  });
});
