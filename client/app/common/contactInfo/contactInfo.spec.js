import ContactInfoModule from './contactInfo'
import ContactInfoController from './contactInfo.controller';
import ContactInfoComponent from './contactInfo.component';
import ContactInfoTemplate from './contactInfo.html';

describe('ContactInfo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ContactInfoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ContactInfoController();
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
      expect(ContactInfoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ContactInfoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ContactInfoTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ContactInfoController);
      });
  });
});
