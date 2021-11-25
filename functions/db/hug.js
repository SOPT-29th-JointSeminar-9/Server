const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllHugsPopular = async (client) => {
  const { rows } = await client.query(
    `
    SELECT hug.id, hug.title as hug_title, hug.nickname, hug.fan_count, hug.listener_count, hug.sent_time, music.title as music_title, music.artist, music.cover
    FROM hug LEFT JOIN music ON hug."first_music_id"=music."id"
    ORDER BY hug.listener_count DESC
    ;
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getAllHugsPopular };
