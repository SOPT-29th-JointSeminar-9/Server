const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllHugs = async (client) => {
  const { rows } = await client.query(
    `
    SELECT hug.id, hug.title as hug_title, hug.nickname, hug.fan_count, hug.listener_count, hug.sent_time, music.title as music_title, music.artist, music.cover
    FROM hug LEFT JOIN music ON hug."first_music_id"=music."id"
    ORDER BY hug.created_at DESC;
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getAllHugsPopular = async (client) => {
  const { rows } = await client.query(
    `
    SELECT hug.id, hug.title as hug_title, hug.nickname, hug.fan_count, hug.listener_count, hug.sent_time, music.title as music_title, music.artist, music.cover
    FROM hug LEFT JOIN music ON hug."first_music_id"=music."id"
    ORDER BY hug.listener_count DESC;
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getHugById = async (client, hugId) => {
  const { rows } = await client.query(
    `
    SELECT hug.id, hug.title as hug_title, hug.nickname, hug.fan_count, hug.listener_count, hug.sent_time, music.title as music_title, music.artist, music.cover
    FROM hug LEFT JOIN music ON hug."first_music_id"=music."id"
    WHERE hug.id = $1
    `,
    [hugId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const createHug = async (client, hugTitle, nickname) => {
  const { rows } = await client.query(
    `
    INSERT INTO hug (title, nickname, fan_count, listener_count, sent_time)
    VALUES ($1, $2, 0, 0, '오후 02:23');
    `,
    [hugTitle, nickname],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllHugsPopular, createHug, getAllHugs, getHugById };
