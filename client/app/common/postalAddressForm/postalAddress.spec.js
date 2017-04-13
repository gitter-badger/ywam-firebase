import PostalAddressModule from './postalAddress'
import PostalAddressController from './postalAddress.controller';
import PostalAddressComponent from './postalAddress.component';
import PostalAddressTemplate from './postalAddress.html';

describe('PostalAddress', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PostalAddressModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PostalAddressController();
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
      expect(PostalAddressTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PostalAddressComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PostalAddressTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PostalAddressController);
      });
  });
});
