import DonorsModule from './donors'
import DonorsController from './donors.controller';
import DonorsComponent from './donors.component';
import DonorsTemplate from './donors.html';

describe('Donors', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DonorsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DonorsController();
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
      expect(DonorsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DonorsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DonorsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DonorsController);
      });
  });
});
