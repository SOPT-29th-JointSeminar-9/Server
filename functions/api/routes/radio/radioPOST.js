// WE SOPT SERVER - 6th(Joint) Seminar
// by HYOSITIVE

const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { hugDB } = require('../../../db');

module.exports = async (req, res) => {
  const { hugTitle, nickname } = req.body;

  if (!hugTitle || !nickname) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ADD_MUSICHUG_FAIL));

  let client;

  try {
    client = await db.connect(req);

    const newHug = await hugDB.createHug(client, hugTitle, nickname);

    res.status(statusCode.OK).send(util.success(statusCode.CREATED, responseMessage.ADD_MUSICHUG_SUCCESS, newHug));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
