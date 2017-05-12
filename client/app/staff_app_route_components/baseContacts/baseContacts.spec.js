import BaseContactsModule from './baseContacts'
import BaseContactsController from './baseContacts.controller';
import BaseContactsComponent from './baseContacts.component';
import BaseContactsTemplate from './baseContacts.html';

describe('BaseContacts', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseContactsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseContactsController();
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
      expect(BaseContactsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseContactsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseContactsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseContactsController);
      });
  });
});
