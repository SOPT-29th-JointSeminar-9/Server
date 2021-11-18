const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { userDB } = require('../../../db');

module.exports = async (req, res) => {
  let client;

  // try, catch 는 로직, 에러핸들링을 담당
  try {
    console.log(req);
    //connection pool에서 connection을 빌려옵니다.
    client = await db.connect(req);
    const users = await userDB.getAllUsers(client);
    res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.READ_ALL_USERS_SUCCESS, users));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));

    //finally 는 try, catch든 끝나면 시작됨
    // pool을 빌려온 것을 release 해줘야 에러가 생기지 않는다.
  } finally {
    client.release();
  }
};
