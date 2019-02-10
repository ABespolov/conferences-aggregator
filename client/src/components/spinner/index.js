import React, {Component} from 'react';
import './style.css';

class Spinner extends Component {
    render() {
        let text = 'Ищем лучшие конференции для Вас!';
        const {allLoaded} = this.props;
        if (allLoaded) {
            text = 'Пока что это все...';
        }
        return (
            <>
                <p className="spinner-text">{text}</p>
                {!allLoaded ? <div className="spinner">
                    <div className="lds-css ng-scope">
                        <div className="lds-double-ring">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div> : null}
            </>
        );
    }
}

export default Spinner;