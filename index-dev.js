const { bootstrapServer, emitConfigs } = require('./environment');
const { AmbassadorTestkit } = require('@wix/ambassador-testkit');
const {
  NodeWorkshopScalaApp,
} = require('@wix/ambassador-node-workshop-scala-app/rpc');

(async () => {
  const ambassadorTestkit = new AmbassadorTestkit();
  const commentsServiceStub = ambassadorTestkit.createStub(
    NodeWorkshopScalaApp,
  );
  commentsServiceStub
    .CommentsService()
    .fetch.when(siteId => {
      return siteId === 'eb6f81e2-4b03-4d6e-955f-a1b4abf6bbcf';
    })
    .resolve([{ author: 'Yaniv', comment: 'My great comment' }]);
  const app = bootstrapServer();

  await emitConfigs();
  await ambassadorTestkit.start();
  await app.start();
})();
