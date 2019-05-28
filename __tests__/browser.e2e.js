import { addCommentsServiceStub } from '../src/mock/RPCMock';
import { AmbassadorTestkit } from '@wix/ambassador-testkit';

async function getComments() {
  return await page.$eval('#comments-list', e => {
    return Array.from(e.children).map(child => {
      return {
        author: child.querySelector('.author').innerText,
        text: child.querySelector('.text').innerText,
      };
    });
  });
}

describe('Comment application', () => {
  const ambassadorTestkit = new AmbassadorTestkit();
  ambassadorTestkit.beforeAndAfter();
  beforeEach(() => {
    addCommentsServiceStub(ambassadorTestkit);
  });

  afterEach(() => ambassadorTestkit.reset());

  it('should send comment on add button click', async () => {
    // Navigate
    await page.goto(app.getUrl('/'));

    // Fill comment data
    await page.type('#author-name', 'Harry Potter');
    await page.type('#comment-text', 'Abracadabra');

    await page.click('#add-comment-btn');

    // Wait for saving
    await page.waitFor(500);

    // Check comments list
    expect(await getComments()).toEqual([
      {
        author: 'Ronen',
        text: 'lalala',
      },
      {
        author: 'Harry Potter',
        text: 'Abracadabra',
      },
    ]);
  });
});
