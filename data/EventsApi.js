const axios = require("axios");
const { API_KEY } = require("../config");

const BASE_URL = `https://api.eventful.com/json/events/search?app_key=${API_KEY}`;

class Events {
  static async searchEvents() {
    const events = await axios.get(
      `${BASE_URL}&within=60&date=today&l=belfair&t=9+jaunary+2021`
    );
    return events.data;
  }
}

module.exports = Events;
