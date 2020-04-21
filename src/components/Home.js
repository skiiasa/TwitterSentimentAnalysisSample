import React, { Component } from "react";
import { ComplexDonut } from "./complex";
import { Donut } from "./donut";
import "./Home.css";

const RED_COLOR = "#ff5566";
const GREEN_COLOR = "#66ff66";
const GRAY_COLOR = "#d9d9d9";
export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      aggregateLoaded: false,
      todayLoaded: false,
      d1Loaded: false,
      d2Loaded: false,
      d3Loaded: false,
      d4Loaded: false,
      totalAggregate: [],
      todaysAggregate: [],
      dm1Aggregate: [],
      dm2Aggregate: [],
      dm3Aggregate: [],
      dm4Aggregate: [],
      donutItems: [],
      positive: 0,
      neutral: 0,
      negative: 0,
    };
    this.LoadChartData = this.LoadChartData.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  componentDidMount() {
    this.LoadChartData();
  }

  handleErrors(response) {
    if (!response.ok) {
      //console.log("error123", response);
      var d1date = ParseDate(
        new Date(new Date().setDate(new Date().getDate() - 1))
      );
      var baseUrl =
      "https://azureblobsastest1.blob.core.windows.net/sentimentoutput/";
      var d1url = baseUrl + d1date + "/File.txt";
      fetch(d1url)
        .then((res) => res.text())
        .then((result) => {
          // console.log("todays",result);
          this.LoadTodaysValues(result);
        });
    }
    return response;
}
  

  LoadChartData() {
    // console.log("LoadChartData");    
    var baseUrl =
      "https://azureblobsastest1.blob.core.windows.net/sentimentoutput/";
    var url = baseUrl + ParseDate(new Date()) + "/File.txt";
    fetch(url).then(this.handleErrors)
      .then((res) => res.text())
      .then(
        (result) => {
          // console.log("todays",result);
          this.LoadTodaysValues(result);
        }
      );

    // fetch(baseUrl+"0_856259411cb3480ebaab4d1f8c6ea1ec_1.json")
    //   .then((res) => res.text())
    //   .then(
    //     (result) => {
    //       var donutDataItems;
    //       ({ donutDataItems } = ParseResponse(result));
    //       this.setState({
    //         aggregateLoaded: true,
    //         totalAggregate: donutDataItems,
    //       });
    //     },
    //     (error) => {
    //       console.log("error", error);
    //     }
    //   );
    var d1date = ParseDate(
      new Date(new Date().setDate(new Date().getDate() - 1))
    );
    var d1url = baseUrl + d1date + "/File.txt";
    // console.log(d1url);
    fetch(d1url)
      .then((res) => res.text())
      .then(
        (result) => {
          fetch(result)
            .then((res) => res.text())
            .then(
              (data) => {
                this.LoadD1Data(data);
              },
              (error) => {
                console.log("error", error);
              }
            );
        },
        (error) => {
          console.log("error", error);
        }
      );

    var d2date = ParseDate(
      new Date(new Date().setDate(new Date().getDate() - 2))
    );
    var d2url = baseUrl + d2date + "/File.txt";
    console.log("d2url", d2url);
    fetch(d2url)
      .then((res) => res.text())
      .then(
        (result) => {
          fetch(result)
            .then((res) => res.text())
            .then(
              (data) => {
                this.LoadD2Data(data);
              },
              (error) => {
                console.log("error", error);
              }
            );
        },
        (error) => {
          console.log("error", error);
        }
      );

    var d3date = ParseDate(
      new Date(new Date().setDate(new Date().getDate() - 3))
    );
    var d3url = baseUrl + d3date + "/File.txt";
    // console.log(d3url);
    fetch(d3url)
      .then((res) => res.text())
      .then(
        (result) => {
          fetch(result)
            .then((res) => res.text())
            .then(
              (data) => {
                this.LoadD3Data(data);
              },
              (error) => {
                console.log("error", error);
              }
            );
        },
        (error) => {
          console.log("error", error);
        }
      );

    var d4date = ParseDate(
      new Date(new Date().setDate(new Date().getDate() - 4))
    );
    var d4url = baseUrl + d4date + "/File.txt";
    // console.log(d3url);
    fetch(d4url)
      .then((res) => res.text())
      .then(
        (result) => {
          fetch(result)
            .then((res) => res.text())
            .then(
              (data) => {
                this.LoadD4Data(data);
              },
              (error) => {
                console.log("error", error);
              }
            );
        },
        (error) => {
          console.log("error", error);
        }
      );
  }

  LoadD3Data(result) {
    var donutDataItems;
    ({ donutDataItems } = ParseResponse(result));
    this.setState({
      aggregateLoaded: true,
      d3Loaded: true,
      dm3Aggregate: donutDataItems,
    });
  }

  LoadD4Data(result) {
    var donutDataItems;
    ({ donutDataItems } = ParseResponse(result));
    this.setState({
      aggregateLoaded: true,
      d4Loaded: true,
      dm4Aggregate: donutDataItems,
    });
  }

  LoadD2Data(result) {
    var donutDataItems;
    ({ donutDataItems } = ParseResponse(result));
    // console.log("april12-result",result)
    console.log("april12", donutDataItems);
    this.setState({
      aggregateLoaded: true,
      d2Loaded: true,
      dm2Aggregate: donutDataItems,
    });
  }

  LoadD1Data(result) {
    var donutDataItems;
    ({ donutDataItems } = ParseResponse(result));
    //  console.log("april13",donutDataItems)
    this.setState({
      d1Loaded: true,
      dm1Aggregate: donutDataItems,
    });
  }

  LoadTodaysValues(url) {
    fetch(url)
      .then((res) => res.text())
      .then(
        (result) => {
          var data;
          var positiveItems;
          var negativeItems;
          var neutralItems;
          var donutDataItems;
          ({
            data,
            positiveItems,
            negativeItems,
            neutralItems,
            donutDataItems,
            result,
          } = ParseResponse(result));
          var total = Sum(data);
          var positive = Sum(positiveItems) / total;
          var negative = Sum(negativeItems) / total;
          var neutral = Sum(neutralItems) / total;
          // console.log("todays", data,total,positive,negative,neutral)
          this.setState({
            todaysAggregate: donutDataItems,
            todayLoaded: true,
            positive: Math.round(positive * 100),
            negative: Math.round(negative * 100),
            neutral: Math.round(neutral * 100),
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error", error);
        }
      );
  }

  render() {
    function refreshPage() {
      window.location.reload(false);
    }

    const renderProgress = (progress) => <strong>{progress}%</strong>;

    const GetCharts = (
      <div>
        <h5>Todays Status</h5>
        <ul className="graphList">
          <li className="graphListItem">
            <ul className="graphList">
              <li><div><button class="button buttonGreen"></button><span className="legendSpan">Positive</span></div></li>
              <li><div><button class="button buttonGray"></button><span className="legendSpan">Neutral</span></div></li>
              <li><div><button class="button buttonRed"></button><span className="legendSpan">Negative</span></div></li>
             </ul>
          </li>
          <li className="graphListItem">           
            <div className="graphListItemdiv">
              <span className="chartTitle">Aggregate</span>
              <ComplexDonut
                className="chartview"
                size={200}
                radius={80}
                segments={this.state.todaysAggregate}
                thickness={40}
                startAngle={-90}
              />
            </div>
          </li>
          <li className="graphListItem">
            <div className="graphListItemdiv">
              <span className="chartTitle">Positive</span>
              <Donut progress={this.state.positive} onRender={renderProgress} />
            </div>
          </li>
          <li className="graphListItem">
            <div className="graphListItemdiv">
              <span className="chartTitle">Neutral</span>
              <Donut progress={this.state.neutral} onRender={renderProgress} />
            </div>
          </li>
          <li className="graphListItem">
            <div className="graphListItemdiv">
              <span className="chartTitle">Negative</span>
              <Donut progress={this.state.negative} onRender={renderProgress} />
            </div>
          </li>
        </ul>
        <h5>Summary Status</h5>
        <ul className="graphList">
        <li className="graphListItem">
            <ul className="graphList">
              <li><div><button class="button buttonGreen"></button><span className="legendSpan">Positive</span></div></li>
              <li><div><button class="button buttonGray"></button><span className="legendSpan">Neutral</span></div></li>
              <li><div><button class="button buttonRed"></button><span className="legendSpan">Negative</span></div></li>
             </ul>
          </li>
          <li className="graphListItem">
            <div className="graphListItemdiv">
              <span className="chartTitle">
                {`${new Date(
                  new Date().setDate(new Date().getDate() - 1)
                )}`.substr(4, 11)}
              </span>
              <ComplexDonut
                className="chartview"
                size={200}
                radius={80}
                segments={this.state.dm1Aggregate}
                thickness={40}
                startAngle={-90}
              />
            </div>
          </li>
          <li className="graphListItem">
            <div className="graphListItemdiv">
              <span className="chartTitle">
                {`${new Date(
                  new Date().setDate(new Date().getDate() - 2)
                )}`.substr(4, 11)}
              </span>
              <ComplexDonut
                className="chartview"
                size={200}
                radius={80}
                segments={this.state.dm2Aggregate}
                thickness={40}
                startAngle={-90}
              />
            </div>
          </li>
          <li className="graphListItem">
            <div className="graphListItemdiv">
              <span className="chartTitle">
                {`${new Date(
                  new Date().setDate(new Date().getDate() - 3)
                )}`.substr(4, 11)}
              </span>
              <ComplexDonut
                className="chartview"
                size={200}
                radius={80}
                segments={this.state.dm3Aggregate}
                thickness={40}
                startAngle={-90}
              />
            </div>
          </li>
          <li className="graphListItem">
            <div className="graphListItemdiv">
              <span className="chartTitle">
                {`${new Date(
                  new Date().setDate(new Date().getDate() - 4)
                )}`.substr(4, 11)}
              </span>
              <ComplexDonut
                className="chartview"
                size={200}
                radius={80}
                segments={this.state.dm4Aggregate}
                thickness={40}
                startAngle={-90}
              />
            </div>
          </li>
        </ul>
      </div>
    );

    return (
      <div>
        <h3 className="title">
          Lifting COVID19 Restrictions
        </h3>
        <h5 className="title">
          Real time sentiments from twitter
        </h5>
        <div id="donutdiv">
          {this.state.todayLoaded &&
          this.state.d1Loaded &&
          this.state.d2Loaded &&
          this.state.d3Loaded &&
          this.state.d4Loaded ? (
            GetCharts
          ) : (
            <div></div>
          )}
        </div>
        <div id="refreshdiv">
          <button id="buttonRefresh" onClick={refreshPage}>
            Click to reload!
          </button>
        </div>
        <div>
          <p>
            As you may already know few European countries like Austria, Denmark
            are planning to ease the restrictions, this causes mixed reactions
            from people in the current situation. This is a sample app which
            analyses real time twitter feeds using sentiment140 (
            <a href="http://help.sentiment140.com/for-students">
              http://www.sentiment140.com/
            </a>
            ) to determine whether the tweeted text has positive, negative or
            neutral reaction on the current situation. The key words used for
            picking the tweets are “lifting lockdown” and “lifting restrictions”
            in the same order of the words.
          </p>
          <p>
            The feed from twitter API is fed to Azure Event hub for handling
            huge stream of data, and then this stream of data is fed to azure
            streaming analytics which runs a tumbling window aggregation
            function for window width of 1hr, to aggregate the sentiment scores.
            This aggregated data is then stored in Azure blob store and
            visualized in the this website.
          </p>
          <p>
            The data was collected from April 12th 2020 onwards. The website
            shows todays Aggregate positive(green), negative(red) and neutral
            (gray) scores. Todays values are updated every hour as the tweets
            are processed. And further down the website shows last 4 days
            results in the summary status.
          </p>
          {/* <span>Future work</span>
          <ul>
            <li>To show time series chart of hourly aggregated scores.</li>
            <li>
              To show infection rate, death rate, recovery rate along with the
              sentiment scores.
            </li>
          </ul> */}
        </div>
      </div>
    );
  }
}
function ParseDate(d) {
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  var result = "";
  if (curr_date < 9) {
    result += "0" + curr_date + "-";
  } else {
    result += curr_date + "-";
  }
  if (curr_month < 9) {
    result += "0" + curr_month + "-";
  } else {
    result += curr_month + "-";
  }
  return result + curr_year;
}

function Sum(data) {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    total += data[i].ScoreCounts;
  }
  return total;
}

function ParseResponse(result) {
  if (result.endsWith("]") === false) {
    result = result + "]";
  }
  var data = JSON.parse(result);
  var positiveItems = data.filter((item) => item.SentimentScore === 4);
  var negativeItems = data.filter((item) => item.SentimentScore === 0);
  var neutralItems = data.filter((item) => item.SentimentScore === 2);
  var donutDataItems = [
    {
      color: GREEN_COLOR,
      value: Sum(positiveItems),
    },
    {
      color: RED_COLOR,
      value: Sum(negativeItems),
    },
    {
      color: GRAY_COLOR,
      value: Sum(neutralItems),
    },
  ];
  return {
    data,
    positiveItems,
    negativeItems,
    neutralItems,
    donutDataItems,
    result,
  };
}
