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
    return (
        <div className="row progress-wraper">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Current progress</span>
                        <div className="progress-loader">
                            <div className={classNames} style={style}/>
                        </div>

                    </div>
                    <div className="card-action">
                        <span>`${progress}/${maximum}`</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function normalize(current, maximum) {
    return current * 100 / maximum;
}

export default ProgressBar;