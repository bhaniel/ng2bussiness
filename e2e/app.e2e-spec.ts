import { Ng2bussinessPage } from './app.po';

describe('ng2bussiness App', function() {
  let page: Ng2bussinessPage;

  beforeEach(() => {
    page = new Ng2bussinessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
