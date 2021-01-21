const axios = require("axios");
const parseString = require("xml2js").parseString;
const { API_KEY } = require("../config");

const BASE_URL = `https://api.eventful.com`;

class Events {
  static async getCategoryList() {
    let url = `${BASE_URL}/rest/categories/list?app_key=${API_KEY}`;
    const categories = await axios.get(url);
    parseString(categories.data, { trim: true }, function (err, result) {
      return result;
    });
  }

  static async searchEvents(date) {
    let dateRange = `${date}00-${date}00`;
    console.log(dateRange);
    let url = `${BASE_URL}/json/events/search?app_key=${API_KEY}
              &page_size=50&within=25&change_multi_day_start=true
              &location=seattle&date=${dateRange}`;
    const events = await axios.get(url);
    return events.data;
  }
}

module.exports = Events;
