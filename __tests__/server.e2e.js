import axios from 'axios';
import {addCommentsServiceStub, TEST_COMMENTS} from "../src/mock/RPCMock";

describe('When rendering', () => {
  const ambassadorTestkit = addCommentsServiceStub();
  ambassadorTestkit.beforeAndAfter();
  afterEach(() => ambassadorTestkit.reset());
  
  it('should return comments', async () => {
    const url = app.getUrl('/comments');
    const response = await axios.get(url);
    expect(response.data).toEqual(TEST_COMMENTS);
  });
  
  it('should post comments', async () => {
    const url = app.getUrl('/comments');
    let newComment = {text: 'Kukuruku', author: 'Lena'};
    const post = await axios.post(url, newComment);
    expect(post.data).toEqual('');
    
    const response = await axios.get(url);
    expect(response.data).toContainEqual(newComment);
    
  });
});
