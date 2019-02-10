import React, {Component} from 'react';
import './style.css';

class Spinner extends Component {
    render() {
        let text = 'Ищем лучшие конференции для Вас!';
        const {allLoaded, offline} = this.props;
        if (allLoaded) {
            text = 'Пока что это все...';
        }else if(offline){
            text = 'Приложение в оффлайн режиме.';
        }
        return (
            <>
                <p className="spinner-text">{text}</p>
                {!offline && !allLoaded ? <div className="spinner">
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