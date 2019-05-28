import axios from 'axios';
import { AmbassadorTestkit } from '@wix/ambassador-testkit';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

describe('When rendering', () => {
  const ambassadorTestkit = new AmbassadorTestkit();
  ambassadorTestkit.beforeAndAfter();
  afterEach(() => ambassadorTestkit.reset());

  it('should return comments', async () => {
    const aComment = { author: 'Ronen', text: 'lalala' };
    const commentsServiceStub = ambassadorTestkit.createStub(
      NodeWorkshopScalaApp,
    );

    commentsServiceStub
      .CommentsService()
      .fetch.when(siteId => {
        return siteId === 'eb6f81e2-4b03-4d6e-955f-a1b4abf6bbcf';
      })
      .resolve([aComment]);

    const url = app.getUrl('/comments');
    const response = await axios.get(url);

    expect(response.data).toEqual([aComment]);
  });
});
