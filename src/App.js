import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breakDuration: 1,
            currentBreakDuration: 60,
            sessionDuration: 5,
            currentSessionDuration: 300,
            currentStepDuration: 5,
            currentStepDurationText: '',
            intervalId: 0,
            currentStepState: 'SESSION',
            chronoRunning: false
        };
    }
    componentDidMount()
    {
        this.setState({
            currentStepDurationText: this.secondsTimeSpanToMS(this.state.sessionDuration * 60)
        });
    }

    increaseBreakDuration() {
        this.setState({
            breakDuration: this.state.breakDuration + 1,
            currentBreakDuration: (this.state.breakDuration + 1) * 60
        });
    }

    decreaseBreakDuration() {
        this.setState({
            breakDuration: Math.max(this.state.breakDuration - 1, 1),
            currentBreakDuration: Math.max(this.state.breakDuration - 1, 1) * 60
        });
    }

    increaseSessionDuration() {
        this.setState({
            sessionDuration: this.state.sessionDuration + 1,
            currentSessionDuration: (this.state.sessionDuration + 1) * 60,
            currentStepDurationText: this.secondsTimeSpanToMS((this.state.sessionDuration + 1) * 60)
        });
    }

    decreaseSessionDuration() {
        this.setState({
            sessionDuration: Math.max(this.state.sessionDuration - 1, 1),
            currentSessionDuration: Math.max(this.state.sessionDuration - 1, 1) * 60,
            currentStepDurationText: this.secondsTimeSpanToMS(Math.max(this.state.sessionDuration - 1, 1) * 60)
        });
    }

    startChrono() {
        if (this.state.chronoRunning === false) {
            this.setState({chronoRunning: true});

            if (this.state.currentStepState === 'SESSION') {
                this.setState({
                    currentStepDuration: this.state.currentSessionDuration,
                });
            }
            else {
              this.setState({
                  currentStepDuration: this.state.currentBreakDuration,
              });
            }
            var anIntervalId = setInterval(() => this.countDown(), 1000);
            this.setState({intervalId: anIntervalId});
        }
        else {// chrono is running so we set it to not running and stop it
          this.setState({chronoRunning: false});
          clearInterval(this.state.intervalId);
        }
    }

    countDown() {
        console.log("this.state.currentSessionDuration " + this.state.currentSessionDuration);
        console.log("this.state.currentBreakDuration " + this.state.currentBreakDuration);

        if (this.state.currentSessionDuration >= 1) {
            this.setState({
                currentStepState: 'SESSION',
                currentSessionDuration: this.state.currentSessionDuration - 1,
                currentStepDuration: this.state.currentStepDuration - 1,
                currentStepDurationText: this.secondsTimeSpanToMS(this.state.currentStepDuration)
            });
        } else if (this.state.currentSessionDuration === 0 && this.state.currentBreakDuration >= 0) {
            this.setState({
                currentStepState: 'BREAK',
                currentBreakDuration: this.state.currentBreakDuration - 1,
                currentStepDuration: this.state.currentBreakDuration - 1,
                currentStepDurationText: this.secondsTimeSpanToMS(this.state.currentStepDuration)
            });
        }
        if (this.state.currentSessionDuration === 0 && this.state.currentBreakDuration === 0) {
            clearInterval(this.state.intervalId);
        }
    }

    secondsTimeSpanToMS(s) {
        var m = Math.floor(s / 60); //Get remaining minutes
        s -= m * 60;
        return (m < 10
            ? '0' + m
            : m) + ":" + (s < 10
            ? '0' + s
            : s); //zero padding on minutes and seconds
    }

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="text-center">
                        <h2>
                            Khac Quyet DANG
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="text-center timeSetting">
                        <div className="col-lg-2 col-lg-offset-4">
                            <div>
                                <h5>
                                    BREAK LENGTH
                                </h5>
                            </div>
                            <div>
                                <div onClick={() => this.decreaseBreakDuration()} className="inline customButton">
                                    <div id="decreaseBreakDuration">
                                        -
                                    </div>
                                </div >
                                <div id="currentBreakDuration" className="inline">
                                    {this.state.breakDuration}
                                </div>
                                <div onClick={() => this.increaseBreakDuration()} className="inline customButton">
                                    <div id="addBreakDuration">
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center timeSetting">

                        <div className="col-lg-2">
                            <div>
                                <h5 >
                                    SESSION LENGTH
                                </h5>
                            </div>
                            <div onClick= {() => this.decreaseSessionDuration()} className="inline customButton">
                                <div id="moinsSessionDuration">
                                    -
                                </div>
                            </div>
                            <div id="currentSessionDuration" className="inline">
                                {this.state.sessionDuration}
                            </div>
                            <div onClick= {() => this.increaseSessionDuration()} className="inline customButton">
                                <div id="addSessionDuration">
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="inner-center">
                        <div id="container_canvas_circle">
                            <div className="canvas_div">
                                <canvas id="canvas_id"></canvas>
                            </div>
                            <div id="circle_div" onClick= {() => this.startChrono()} className="circle">
                                <p className="top" id="circle_text_title">
                                    {this.state.currentStepState}
                                </p>
                                <p className="bottom" id="sessionStep">
                                    {this.state.currentStepDurationText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
