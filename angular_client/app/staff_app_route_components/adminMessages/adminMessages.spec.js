import AdminMessagesModule from './adminMessages'
import AdminMessagesController from './adminMessages.controller';
import AdminMessagesComponent from './adminMessages.component';
import AdminMessagesTemplate from './adminMessages.html';

describe('AdminMessages', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AdminMessagesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AdminMessagesController();
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
      expect(AdminMessagesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AdminMessagesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AdminMessagesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AdminMessagesController);
      });
  });
});
