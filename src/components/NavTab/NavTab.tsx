import * as React from 'react';
import './NavTab.scss';

export type TabItem = {
    value: number,
    label: string,
}

interface InternalProps {
    active: number;
    tabList: TabItem[],
    onTabChange: (value: number) => void;
}

interface InternalState {
    active: number;
}

export default class NavTab extends React.Component<InternalProps, InternalState> {

    constructor(props: InternalProps) {
        super(props);

        this.state = {
            active: 0,
        };
    }

    public handleClick(value: number): void {
        this.setState({ active: value });
        this.props.onTabChange(value);
    }

    public render() {
        const { tabList } = this.props;

        if (tabList && tabList.length === 0) {
            return null;
        }

        return (
            <div className="cruise-nav-tab">
                {tabList.map((item: TabItem, idx: number) => (
                    <div 
                        key={idx} 
                        className={`nav-tab-item ${this.state.active === item.value ? 'active' : ''}`}
                        onClick={() => this.handleClick(item.value)}>
                        <span className="nav-tab-item-label">{item.label}</span>
                    </div>
                ))}
            </div>
        );
    };
}
