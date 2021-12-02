// WE SOPT SERVER - 6th(Joint) Seminar
// by HYOSITIVE

const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const sc = require('../../../constants/statusCode');
const rm = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { hugDB } = require('../../../db');

module.exports = async (req, res) => {
  const { hugTitle, nickname } = req.body;

  if (!hugTitle || !nickname) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.ADD_MUSICHUG_FAIL));

  let client;

  try {
    client = await db.connect(req);

    const newHug = await hugDB.createHug(client, hugTitle, nickname);

    res.status(sc.CREATED).send(success(sc.CREATED, rm.ADD_MUSICHUG_SUCCESS, newHug));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
