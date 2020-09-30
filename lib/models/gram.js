const pool = require('../utils/pool');

module.exports = class Gram {
  id;
  photoUrl;
  caption;
  tags;
  userId;

  constructor(row) {
    this.id = row.id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
    this.userId = row.user_id;
  }

  static async insert(gram) {
    const { rows } = await pool.query(
      'INSERT INTO grams (photo_url, caption, tags, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [gram.photoUrl, gram.caption, gram.tags, gram.userId]
    );

    return new Gram(rows[0]);
  }
}
