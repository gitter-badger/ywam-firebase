import BaseEmailTemplatesModule from './baseEmailTemplates'
import BaseEmailTemplatesController from './baseEmailTemplates.controller';
import BaseEmailTemplatesComponent from './baseEmailTemplates.component';
import BaseEmailTemplatesTemplate from './baseEmailTemplates.html';

describe('BaseEmailTemplates', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseEmailTemplatesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseEmailTemplatesController();
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
      expect(BaseEmailTemplatesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseEmailTemplatesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseEmailTemplatesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseEmailTemplatesController);
      });
  });
});
