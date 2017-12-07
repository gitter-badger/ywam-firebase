import DonorPageModule from './donorPage'
import DonorPageController from './donorPage.controller';
import DonorPageComponent from './donorPage.component';
import DonorPageTemplate from './donorPage.html';

describe('DonorPage', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DonorPageModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DonorPageController();
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
      expect(DonorPageTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DonorPageComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DonorPageTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DonorPageController);
      });
  });
});
