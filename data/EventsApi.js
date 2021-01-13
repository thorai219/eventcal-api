const axios = require("axios");
const { API_KEY } = require("../config");

const BASE_URL = `https://api.eventful.com/json/events/search?app_key=${API_KEY}`;

class Events {
  static async searchEvents(date) {
    let url = `${BASE_URL}&keyword=sports&within=50&location=98546&date=${date}`;
    const events = await axios.get(url);
    return events.data;
  }
}

module.exports = Events;
