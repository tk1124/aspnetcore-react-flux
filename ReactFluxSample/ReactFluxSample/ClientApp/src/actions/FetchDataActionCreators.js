import { dispatch } from '../dispatcher/Dispatcher';
import { ActionTypes } from '../constants/AppConstants';
import axios from 'axios';

export const actionCreators = {
  requestWeatherForecasts: async (startDateIndex, currentDateIndex) => {
    if (startDateIndex === currentDateIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: ActionTypes.requestWeatherForecastsType, startDateIndex });

    const baseUrl = 'api';
    const axiosInstance = axios.create({
      baseURL: baseUrl,
    });

    const path = `SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`;
    const response = await axiosInstance.get(path)
      .then((response) => response);
    const forecasts = await response.data;

    dispatch({ type: ActionTypes.receiveWeatherForecastsType, startDateIndex, forecasts });
  }
};
