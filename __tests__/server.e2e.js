import axios from 'axios';
import {addCommentsServiceStub, TEST_COMMENTS} from "../src/mock/RPCMock";

const {AmbassadorTestkit} = require('@wix/ambassador-testkit');

describe('When rendering', () => {
  const ambassadorTestkit = new AmbassadorTestkit();
  ambassadorTestkit.beforeAndAfter();
  
  beforeEach(() => {
    addCommentsServiceStub(ambassadorTestkit);
  });
  
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
