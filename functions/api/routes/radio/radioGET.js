const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const sc = require('../../../constants/statusCode');
const rm = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { postDB } = require('../../../db');

module.exports = async (req, res) => {
  let client;

  // try, catch 는 로직, 에러핸들링을 담당
  try {
    //connection pool에서 connection을 빌려옵니다.
    client = await db.connect(req);
    const posts = await postDB.getAllPosts(client);
    res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_POSTS_SUCCESS, posts));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));

    //finally 는 try, catch든 끝나면 시작됨
    // pool을 빌려온 것을 release 해줘야 에러가 생기지 않는다.
  } finally {
    client.release();
  }
};
