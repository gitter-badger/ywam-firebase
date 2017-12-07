import BaseProjectTaskEditModule from './baseProjectTaskEdit'
import BaseProjectTaskEditController from './baseProjectTaskEdit.controller';
import BaseProjectTaskEditComponent from './baseProjectTaskEdit.component';
import BaseProjectTaskEditTemplate from './baseProjectTaskEdit.html';

describe('BaseProjectTaskEdit', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseProjectTaskEditModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseProjectTaskEditController();
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
      expect(BaseProjectTaskEditTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseProjectTaskEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseProjectTaskEditTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseProjectTaskEditController);
      });
  });
});
