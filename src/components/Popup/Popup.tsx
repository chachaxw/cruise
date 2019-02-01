import * as React from 'react';
import ReactDOM from "react-dom"
import './Popup.scss';

interface InternalProps {
    otherProps?: any,
    isVisible?: boolean;
    onAdd?: (value: string) => void;
}

interface InternalState {
    value: string;
    visible: boolean;
}

export default class Popup extends React.Component<InternalProps, InternalState> {

    private wrapperRef: any;

    private static getDerivedStateFromProps(props: InternalProps, state: InternalState) {
        if (props.isVisible !== state.visible) {
            return {
                visible: props.isVisible,
            };
        }
        return null;
    }

    public constructor(props: InternalProps) {
        super(props);
    
        this.state = {
            value: '',
            visible: this.props.isVisible || false,
        };
    }

    public componentDidMount() {
        const el = ReactDOM.findDOMNode(this);

        console.log(this.props, el);
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    public componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }
    
    public handleClickOutside(event: any) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log('You clicked outside of me!');
            this.handleCancel();
        }
    }

    public handleAdd() {

        if (!this.props.onAdd) {
            return;
        }

        this.props.onAdd(this.state.value);
    }

    public handleCancel() {
        this.setState({ value: '', visible: false });
    }

    public setWrapperRef(node: any) {
        this.wrapperRef = node;
    }

    public render() {
        const { otherProps } = this.props;

        const popup = this.state.visible ? (
            <div className="cruise-popup" {...otherProps} ref={(node) => this.setWrapperRef(node)}>
                <p>Separate multiple resource name with commas</p>
                <input type="text" className="popup-input" 
                    onChange={(event) => this.setState({ value: event.target.value })} />
                <div className="popup-button-group">
                    <button className="add-resource-button" onClick={() => this.handleAdd()}>
                        Add Resources
                    </button>
                    <button className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        ) : null;

        return [
            this.props.children,
            ReactDOM.createPortal(popup, document.getElementById('root')!),
        ];
    }
}
