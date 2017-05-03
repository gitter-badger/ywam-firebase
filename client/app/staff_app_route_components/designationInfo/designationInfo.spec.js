import DesignationInfoModule from './designationInfo'
import DesignationInfoController from './designationInfo.controller';
import DesignationInfoComponent from './designationInfo.component';
import DesignationInfoTemplate from './designationInfo.html';

describe('DesignationInfo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DesignationInfoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DesignationInfoController();
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
      expect(DesignationInfoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DesignationInfoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DesignationInfoTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DesignationInfoController);
      });
  });
});
