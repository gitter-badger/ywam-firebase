import DonationCodePageModule from './donationCodePage'
import DonationCodePageController from './donationCodePage.controller';
import DonationCodePageComponent from './donationCodePage.component';
import DonationCodePageTemplate from './donationCodePage.html';

describe('DonationCodePage', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DonationCodePageModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DonationCodePageController();
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
      expect(DonationCodePageTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DonationCodePageComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DonationCodePageTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DonationCodePageController);
      });
  });
});
