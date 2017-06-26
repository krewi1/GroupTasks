import React from 'react';

const ProgressBar = ({adminMode, progress, maximum}) => { // eslint-disable-line react/prefer-stateless-function
    if (adminMode)return <div/>;
    const calculation = normalize(progress, maximum);
    let classNames = 'current-state ';
    let completed = '';
    const style = {
        width: `${Math.floor(calculation)}%`,
    };

    if (calculation < 33) {
        completed = "notAtAll";
    }
    if (calculation > 33 && calculation < 66) {
        completed = "inTheMiddle";
    }
    if (calculation > 66) {
        completed = "almostDone";
    }
    classNames += completed;
    const progressText = `${progress}/${maximum}`;
    return (
        <div className="center-align">
            <div className="row progress-wraper center-align">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Current progress</span>
                            <div className="progress-loader">
                                <div className={classNames} style={style}/>
                            </div>

                        </div>
                        <div className="card-action">
                            <span>{progressText}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function normalize(current, maximum) {
    let calc = current * 100 / maximum;
    return calc > 100 ? 100 : calc;
}

export default ProgressBar;