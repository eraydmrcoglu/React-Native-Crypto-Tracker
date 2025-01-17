import axios from "axios";
import moment from "moment";
import { Coin } from "../model";

const formatSparkline = (numbers: any[]) => {
  const sevenDaysAgo = moment().subtract(7, "days").unix();
  let formattedSparkLine = numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    };
  });
  return formattedSparkLine;
};

const formatMarketData = (data: Coin[]) => {
  let formattedData: Coin[] = [];
  data.forEach((item) => {
    const formattedSparkLine = formatSparkline(item.sparkline_in_7d.price);
    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkLine,
      },
    };
    formattedData.push(formattedItem);
  });
  return formattedData;
};

export const getMarketData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d"
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getQueryResults = async (query: string) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search?query=" + query
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCoins = async (idArray: string[]) => {
  try {
    let ids = "";
    idArray.forEach((id) => {
      ids = ids + "%2C" + id;
    });
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=" +
        ids
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTrending = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending"
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything?q=bitcoin%20OR%20ethereum%20OR%20crypto&apiKey=e50e72d3ba55451fb3279b817c99e473&pageSize=100"
    );
    const data = response.data;
    return data.articles;
  } catch (error) {
    console.log(error.message);
  }
};
