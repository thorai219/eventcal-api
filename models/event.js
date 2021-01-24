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
  // get list of event attendees
  static async getAttendees(event_id) {
    console.log(event_id);
    let result = await db.query(
      `SELECT * FROM event_attendees WHERE event_id = $1`,
      [event_id]
    );

    if (!result.rows[0]) {
      throw new Error(`There are no one going to this event`);
    }

    return result.rows[0].username;
  }

  static async getInvites(id, username) {
    let result = await db.query(
      `SELECT invited FROM event_invites WHERE invitee = $1 AND event_id = $2`,
      [username, id]
    );

    if (!result.row[0]) {
      throw new Error(`You didnt invite anyone yet.`);
    }

    return result.rows[0];
  }

  // create an event
  static async createEvent(data) {
    const result = await db.query(
      `INSERT INTO events (name, details, location, start_date, end_date, start_time, end_time, url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *`,
      [
        data.name,
        data.details,
        data.location,
        data.start_date,
        data.end_date,
        data.start_time,
        data.end_time,
        data.url,
      ]
    );

    return result.rows[0];
  }

  static async deleteEvent(event_id) {
    const result = await db.query(
      `DELETE FROM events WHERE id=$1 RETURNING title`,
      [event_id]
    );
    //throw error if no event is found
    if (!result.rows[0]) {
      const err = new Error(`No event id ${event_id}`);
      err.status = 404;
      throw err;
    }
  }
}

module.exports = Event;
