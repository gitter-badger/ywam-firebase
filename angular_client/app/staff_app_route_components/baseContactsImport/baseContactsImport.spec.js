import BaseContactsImportModule from './baseContactsImport'
import BaseContactsImportController from './baseContactsImport.controller';
import BaseContactsImportComponent from './baseContactsImport.component';
import BaseContactsImportTemplate from './baseContactsImport.html';

describe('BaseContactsImport', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseContactsImportModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseContactsImportController();
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
      expect(BaseContactsImportTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseContactsImportComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseContactsImportTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseContactsImportController);
      });
  });
});
