import { dispatch } from '../dispatcher/Dispatcher';
import { ActionTypes } from '../constants/AppConstants';

export const actionCreators = {
  requestWeatherForecasts: async (startDateIndex, currentDateIndex) => {
    if (startDateIndex === currentDateIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: ActionTypes.requestWeatherForecastsType, startDateIndex });

    const url = `api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`;
    const response = await fetch(url);
    const forecasts = await response.json();

    dispatch({ type: ActionTypes.receiveWeatherForecastsType, startDateIndex, forecasts });
  }
};
