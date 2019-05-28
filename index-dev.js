const { addCommentsServiceStub } = require('./src/mock/RPCMock');
const { AmbassadorTestkit } = require('@wix/ambassador-testkit');
const { bootstrapServer, emitConfigs } = require('./environment');

(async () => {
  const ambassadorTestkit = new AmbassadorTestkit();
  addCommentsServiceStub(ambassadorTestkit);
  const app = bootstrapServer();

  await emitConfigs();
  await ambassadorTestkit.start();
  await app.start();
})();
