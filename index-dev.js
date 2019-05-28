const {addCommentsServiceStub} = require("./src/mock/RPCMock");

const {bootstrapServer, emitConfigs} = require('./environment');


(async () => {
  const ambassadorTestkit = addCommentsServiceStub();
  const app = bootstrapServer();
  
  await emitConfigs();
  await ambassadorTestkit.start();
  await app.start();
})();
