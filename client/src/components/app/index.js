import React, {Component} from 'react';
import './style.css';
import Spinner from '../spinner';
import ServerApi from '../../serverApi';
import List from '../list';
import Panel from '../panel';

const UPDATE_SCROLL_POSITION = 50;
const BLOCKS_PER_PAGE = 8;

class App extends Component {

    state = {
        response: {},
        load: true,
        currentPage: 1,
        allLoaded: false,
        searchKeys: null,
        searchText: '',
        offline: false
    };

    componentDidMount() {
        this.updateData();
    }

    showPosition = (elm) => {
        let parent = elm.parentNode,
            pos = (elm.scrollTop || parent.scrollTop) / (parent.scrollHeight - parent.clientHeight) * 100;
        return pos;
    };

    search = (text) => {
        this.setState(({response, searchText}) => {
            const respArr = Object.keys(response);
            const newData = respArr.filter(item =>
                (response[item].title.toLowerCase().indexOf(searchText) >= 0) ||
                (response[item].description.toLowerCase().indexOf(searchText) >= 0));
            return {
                searchKeys: newData,
                searchText: text ? text : searchText
            }
        });
    };

    updateData = () => {
        document.onscroll = () => {
            let pos = this.showPosition(document.body);
            if (Math.round(pos) > UPDATE_SCROLL_POSITION) {
                this.getData();
                document.onscroll = () => {
                };
            }
        };

        let pos = this.showPosition(document.body);
        const {searchKeys} = this.state;
        const blocksSearched = searchKeys && Object.keys(searchKeys).length;
        if (Math.round(pos) > UPDATE_SCROLL_POSITION || blocksSearched < BLOCKS_PER_PAGE - 1) {
            this.getData();
            this.search();
        }

    };

    onSearch = (inputText) => {
        const text = inputText.toLowerCase();
        this.search(text);
    };

    getData = () => {
        const {currentPage} = this.state;
        ServerApi.getData(currentPage).then((body) => {
            if (body.end !== true) {
                this.setState(({load, response, currentPage}) => {
                    localStorage.setItem('conferencesData', Object.assign(response, body));
                    return {
                        load: false,
                        response: Object.assign(response, body),
                        currentPage: currentPage + 1
                    }
                });
                this.updateData();
            } else {
                this.setState({
                    load: false,
                    allLoaded: true
                });
            }
        }).catch((err) => {
            const data = JSON.parse(localStorage.getItem('conferencesData'));
            this.setState({
                load: false,
                response: data,
                searchKeys: null,
                offline: true
            })
        });
    };

    render() {
        const {load, response, searchKeys, allLoaded, offline} = this.state;
        const list = load ? null : <List data={response} searchKeys={searchKeys}/>;
        return (
            <>
                <Panel onSearch={this.onSearch}/>
                <div>{list}</div>
                <Spinner offline={offline} allLoaded={allLoaded}/>;
            </>
        );
    }
}

export default App;
