import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/base/Widget.jsx';
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import LinearProgressBar from 'js/core/LinearProgressBar.jsx';
import RefreshableWidget from 'js/widget/base/RefreshableWidget.jsx';
import ScalableText from 'js/core/ScalableText.jsx';
import ThresholdConfig from 'js/config/ThresholdConfig.jsx';

const NO_DATE = '--/-- --:--';

class JenkinsMonitoringWidget extends RefreshableWidget {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      exception: null,
      lastUpdate: NO_DATE,
      version: '--',
      memory: 0,
      cpu: 0,
      fileDescriptor: 0,
      threadCount: 0,
      activeThreadCount: 0,
      freeDiskSpaceInTemp: 0
    };
  }

  componentDidMount() {
    JenkinsClient.getJenkinsInfo((jsonResponse) => {
      this.setState({
        loaded: true,
        lastUpdate: jsonResponse.lastUpdate,
        version: jsonResponse.version,
        memory: jsonResponse.memory,
        cpu: jsonResponse.cpu,
        fileDescriptor: jsonResponse.fileDescriptor,
        activeThreadCount: jsonResponse.activeThreadCount,
        threadCount: jsonResponse.threadCount,
        freeDiskSpaceInTemp: jsonResponse.freeDiskSpaceInTemp
      });
    }, (exception) => {
      console.log("Error during Jenkins monitoring request, details: ", exception);
      this.setState({exception: exception});
    });
  }

  renderAfterTitle() {
    const version = this.state.version != null ? this.state.version : '--';
    const lastUpdate = this.state.lastUpdate != null ? this.state.lastUpdate : NO_DATE;
    return (
      <div className="afterTitle">
        <ScalableText
          className="version"
          text={`V${version}`}
          textAnchor="middle"
          wViewPort={50}
        />
        <div className="last-update">
          <ScalableText
            text={lastUpdate}
            textAnchor="middle"
          />
        </div>
      </div>
    );
  }

  renderContent() {
    if (this.state.exception != null) {
      return this.renderError(this.state.exception);
    }
    if (this.state.loaded == false) {
      return this.renderLoadingContent();
    }
    const classForValue = (val) => ThresholdConfig.get(this.props.thresholds, val);
    const textForValue = (value) => `${value} %`;
    const threadPercent = this.state.threadCount / 100 * this.state.activeThreadCount;
    const displayValuePosition = {x: 2, y: 10};
    const labelPosition = {x:96, y: 10};
    return (
      <div>
        <LinearProgressBar
          label="Thread"
          value={threadPercent}
          displayValue={`${this.state.activeThreadCount}`}
          classForValue={classForValue}
          displayValuePosition={displayValuePosition}
          labelPosition={labelPosition}
        />
        <LinearProgressBar
          label="Memory"
          value={this.state.memory}
          textForValue={textForValue}
          classForValue={classForValue}
          displayValuePosition={displayValuePosition}
          labelPosition={labelPosition}
        />
        <LinearProgressBar
          label="CPU"
          value={this.state.cpu}
          textForValue={textForValue}
          classForValue={classForValue}
          displayValuePosition={displayValuePosition}
        />
        <LinearProgressBar
          label="File descriptor"
          value={this.state.fileDescriptor}
          textForValue={textForValue}
          classForValue={classForValue}
          displayValuePosition={displayValuePosition}
          labelPosition={labelPosition}
        />
        <LinearProgressBar
          label="Free space"
          value={this.state.freeDiskSpaceInTemp.value}
          displayValue={this.state.freeDiskSpaceInTemp.label}
          textForValue={textForValue}
          classForValue={classForValue}
          displayValuePosition={displayValuePosition}
          labelPosition={labelPosition}
        />
      </div>
    );
  }

  getGlobalHealth() {
    const s = this.state;
    const threadPercent = this.state.threadCount / 100 * this.state.activeThreadCount;
    const kpis = [threadPercent, s.memory, s.cpu, s.fileDescriptor, s.freeDiskSpaceInTemp];
    let result = "good";
    if (this.props.thresholds == null)
      return result;
    for (let kpi of kpis) {
      let health = ThresholdConfig.get(this.props.thresholds, kpi);
      if (health == "bad") {
        result = "bad";
        break;
      }
      if (health == "avg") {
        result = "avg";
      }
    }
    return result;
  }

  render() {
    return (
      <Widget
        className={`jenkins-monitoring ${this.getGlobalHealth()}`}
        title={this.props.displayName}
        afterTitle={this.renderAfterTitle()}
        content={this.renderContent()}
      />
    );
  }

}

JenkinsMonitoringWidget.propTypes = {
  displayName: PropTypes.string,
  thresholds: PropTypes.object,
};

JenkinsMonitoringWidget.defaultProps = {
  displayName: 'undefined',
  thresholds: null
};

export default JenkinsMonitoringWidget;
