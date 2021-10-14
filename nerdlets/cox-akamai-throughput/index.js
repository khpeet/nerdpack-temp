import React from 'react';
import { NrqlQuery, QueryGroup, Dropdown, StackedBarChart, Spinner } from 'nr1';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class AkamaiThroughput extends React.Component {
  constructor(){
    super()
    this.state = {
      loading: true,
      medianData: null,
      stdDevData: null
    }
  }
  //Mean
  //SELECT average(Throughput) as 'Mean (avg)' FROM (SELECT count(*) as 'Throughput' FROM AkamaiEvent WHERE requestHostName LIKE '%signin.coxautoinc.com' AND  requestHostName != 'assets.signin.coxautoinc.com' AND requestPath NOT LIKE '/bridgebar%' AND (httpResponseCode < 500 OR httpResponseCode >= 600) limit max TIMESERIES MAX) since 12 weeks ago limit max TIMESERIES MAX

  //StdDev
  //SELECT stddev(Throughput) as 'Standard Deviation' FROM (SELECT count(*) as 'Throughput' FROM AkamaiEvent WHERE requestHostName LIKE '%signin.coxautoinc.com' AND  requestHostName != 'assets.signin.coxautoinc.com' AND requestPath NOT LIKE '/bridgebar%' AND (httpResponseCode < 500 OR httpResponseCode >= 600) limit max TIMESERIES MAX) since 12 weeks ago TIMESERIES

  componentDidMount() {
  }

  renderBarChart(){
    let mean = `SELECT average(Throughput) as 'Mean (avg)' FROM (SELECT count(*) as 'Throughput' FROM AkamaiEvent WHERE requestHostName LIKE '%signin.coxautoinc.com' AND  requestHostName != 'assets.signin.coxautoinc.com' AND requestPath NOT LIKE '/bridgebar%' AND (httpResponseCode < 500 OR httpResponseCode >= 600) limit max TIMESERIES MAX) since 12 weeks ago limit max TIMESERIES MAX`
    let stdDev = `SELECT stddev(Throughput) as 'Standard Deviation' FROM (SELECT count(*) as 'Throughput' FROM AkamaiEvent WHERE requestHostName LIKE '%signin.coxautoinc.com' AND  requestHostName != 'assets.signin.coxautoinc.com' AND requestPath NOT LIKE '/bridgebar%' AND (httpResponseCode < 500 OR httpResponseCode >= 600) limit max TIMESERIES MAX) since 12 weeks ago TIMESERIES`

    return (
      <QueryGroup>
        <NrqlQuery pollInterval={60000} accountId={2420481} query={mean}/>
        <NrqlQuery pollInterval={60000} accountId={2420481} query={stdDev}/>
        {(mean, dev) => {
          if (mean.loading || dev.loading) {
            return <Spinner />
          }
          console.log(mean)
          console.log(dev)
        }}
      </QueryGroup>
    )
  }

  render() {
    return (
      <>
      <h1>test</h1>
      {this.renderBarChart()}
      </>
    )
  }
}
