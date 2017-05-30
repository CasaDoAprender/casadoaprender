import { PlayerPage } from './app.po';

describe('player App', () => {
  let page: PlayerPage;

  beforeEach(() => {
    page = new PlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
