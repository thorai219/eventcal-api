const axios = require("axios");
const { API_KEY } = require("../config");
const db = require("../db");

const BASE_URL = `https://api.eventful.com`;

class Event {
  static async getEvents(date) {
    // get list of events from eventful api
    let dateRange = `${date}00-${date}00`;
    let url = `${BASE_URL}/json/events/search?app_key=${API_KEY}
              &page_size=50&within=25&change_multi_day_start=true
              &location=seattle&date=${dateRange}`;

    const events = await axios.get(url);

    return events.data;
  }
  // fetch categories
  static async getCategories() {
    const result = await db.query(`SELECT name FROM categories`);

    return result.rows[0];
  }

  static async createEvent(data) {
    const result = await db.query(
      `INSERT INTO events (name, details, location, start_date, end_date, start_time, end_time)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING name, details, location, start_date, end_date, start_time, end_time`,
      [
        data.name,
        data.details,
        data.location,
        data.start_date,
        data.end_date,
        data.start_time,
        data.end_time,
      ]
    );

    return result.rows[0];
  }
}

module.exports = Event;
