import React, { Component } from 'react';
import { Container } from 'flux/utils';
import WeatherForecastsTable from './WeatherForecastsTable';
import Pagination from './Pagination';
import WeatherForecastsStore from '../store/WeatherForecastsStore';
import { actionCreators } from '../actions/FetchDataActionCreators';

class _FetchData extends Component {
  static getStores() {
    return [WeatherForecastsStore];
  }

  static calculateState() {
    return WeatherForecastsStore.getState();
  }

  componentWillMount() {
    // This method runs when the component is first added to the page
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    actionCreators.requestWeatherForecasts(startDateIndex, this.state.startDateIndex);
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
    actionCreators.requestWeatherForecasts(startDateIndex, this.state.startDateIndex);
  }

  render() {
    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        <WeatherForecastsTable forecasts={this.state.forecasts} />
        <Pagination isLoding={this.state.isLoading} startDateIndex={this.state.startDateIndex} />
      </div>
    );
  }

}

const FetchData = Container.create(_FetchData);
export default FetchData;
