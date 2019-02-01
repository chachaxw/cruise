import * as React from 'react';
import './Search.scss';

interface InternalProps {
    onSearch: (value: string) =>void;
}

export default class Search extends React.Component<InternalProps> {

    private delayFlag: any;

    public handleChange(event: any) {

        const value = event.target.value;

        if (this.delayFlag) {
            window.clearTimeout(this.delayFlag);
        }

        this.delayFlag = setTimeout(() => {
            this.props.onSearch(value);
        }, 300);
    }

    public render() {
        return (
            <div className="cruise-search">
                <span className="iconfont icon-search"></span>
                <input type="text" onChange={(event) => this.handleChange(event)}></input>
            </div>
        );
    }
}
