import ContactManagementCardModule from './contactManagementCard'
import ContactManagementCardController from './contactManagementCard.controller';
import ContactManagementCardComponent from './contactManagementCard.component';
import ContactManagementCardTemplate from './contactManagementCard.html';

describe('ContactManagementCard', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ContactManagementCardModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ContactManagementCardController();
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
      expect(ContactManagementCardTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ContactManagementCardComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ContactManagementCardTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ContactManagementCardController);
      });
  });
});
