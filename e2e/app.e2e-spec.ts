import { PocNgSsrPage } from './app.po';

describe('poc-ng-ssr App', () => {
  let page: PocNgSsrPage;

  beforeEach(() => {
    page = new PocNgSsrPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
