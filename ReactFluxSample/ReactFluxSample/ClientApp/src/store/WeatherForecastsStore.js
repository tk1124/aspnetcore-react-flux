import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';

const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: [], isLoading: false };

class WeatherForecastsStore extends ReduceStore {
    getInitialState() {
        return initialState;
    }

    reduce(state, action) {
        state = state || initialState;

        if (action.type === requestWeatherForecastsType) {
            return {
                ...state,
                startDateIndex: action.startDateIndex,
                isLoading: true
            };
        }

        if (action.type === receiveWeatherForecastsType) {
            return {
                ...state,
                startDateIndex: action.startDateIndex,
                forecasts: action.forecasts,
                isLoading: false
            };
        }

        return state;
    }
}

const instance = new WeatherForecastsStore(Dispatcher);
export default instance;