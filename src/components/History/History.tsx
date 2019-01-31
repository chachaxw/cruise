import * as React from 'react';
import './History.scss';

export type HistoryItem = {
    id: number,
    name: string,
    status: string,
}

interface InternalProps {
    history: HistoryItem[],
}

export default class History extends React.Component<InternalProps> {

    public renderHistoryItem(props: HistoryItem) {
        return (
            <li className="history-item" key={props.id}>
                <span className="item-dot"></span>
                <p>{props.name}/{props.status}</p>
            </li>
        );
    }

    public render() {
        const { history } = this.props;

        return (
            <div className="cruise-history">
                <h1>History</h1>
                <ul className="history-list">
                    {history && history.length && history.map((item, index) => this.renderHistoryItem(item))}
                </ul>
            </div>
        );
    }
}
