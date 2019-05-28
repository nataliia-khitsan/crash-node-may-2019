const {
  NodeWorkshopScalaApp,
} = require('@wix/ambassador-node-workshop-scala-app/rpc');

const TEST_COMMENTS = [{author: 'Ronen', text: 'lalala'}];
const TEST_ID = 'eb6f81e2-4b03-4d6e-955f-a1b4abf6bbcf';

const addCommentsServiceStub = function (ambassadorTestkit) {
  
  const commentsServiceStub = ambassadorTestkit.createStub(
    NodeWorkshopScalaApp,
  );
  let commentsService = commentsServiceStub
    .CommentsService();
  
  commentsService
    .fetch.when(siteId => {
      return siteId === TEST_ID;
    })
    .resolve(TEST_COMMENTS);
  
  commentsService.add.when((...args) => {
      const [siteId, comment] = args;
      TEST_COMMENTS.push(comment);
      return siteId === TEST_ID;
    })
    .resolve('');
  
  return ambassadorTestkit;
};

module.exports = {
  addCommentsServiceStub,
  TEST_COMMENTS,
  TEST_ID
};
