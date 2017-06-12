import FundCommitmentEditModule from './fundCommitmentEdit'
import FundCommitmentEditController from './fundCommitmentEdit.controller';
import FundCommitmentEditComponent from './fundCommitmentEdit.component';
import FundCommitmentEditTemplate from './fundCommitmentEdit.html';

describe('FundCommitmentEdit', () => {
  let $rootScope, makeController;

  beforeEach(window.module(FundCommitmentEditModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new FundCommitmentEditController();
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
      expect(FundCommitmentEditTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = FundCommitmentEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FundCommitmentEditTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FundCommitmentEditController);
      });
  });
});
