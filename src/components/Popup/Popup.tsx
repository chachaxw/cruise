import * as React from 'react';
import ReactDOM from "react-dom"
import './Popup.scss';

interface InternalProps {
    otherProps?: any,
    isVisible?: boolean;
    onAdd?: (value: string) => void;
    onCancel?: (visible: boolean) => void;
}

interface InternalState {
    top: number;
    left: number;
    value: string;
    visible: boolean;
}

export default class Popup extends React.Component<InternalProps, InternalState> {

    private wrapperRef: any;
    private arrowWidth: number = 14;
    private arrowHeight: number = 14;

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
            top: 0,
            left: 0,
            value: '',
            visible: this.props.isVisible || false,
        };
    }

    public componentDidMount() {
        document.addEventListener('click', this.handleVisible.bind(this));
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.handleVisible.bind(this));
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }
    
    public handleClickOutside(event: any) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleCancel();
        }
    }

    public handleAdd() {

        if (!this.props.onAdd) {
            return;
        }

        this.props.onAdd(this.state.value);
    }

    public handleVisible(event: any) {

        if (this.wrapperRef && this.wrapperRef.contains(event.target)) {
            return;
        }

        const box = event.target.getBoundingClientRect();
        const top = box.y + box.height + this.arrowHeight;
        const left = box.x - box.width/2 - this.arrowWidth/2;

        this.setState({ 
            value: '', 
            visible: true,
            top,
            left,
        });
    }

    public handleCancel() {
        this.setState({ value: '', visible: false });
        if (!this.props.onCancel) {
            return;
        }

        this.props.onCancel(false);
    }

    public setWrapperRef(node: any) {
        this.wrapperRef = node;
    }

    public render() {
        const { otherProps } = this.props;
        const { top, left, visible } = this.state;

        const popup = visible ? (
            <div 
                style={{ top, left}}
                className="cruise-popup" {...otherProps} 
                ref={(node) => this.setWrapperRef(node)}>
                <p>Separate multiple resource name with commas</p>
                <input type="text" className="popup-input" 
                    onChange={(event) => this.setState({ value: event.target.value })} />
                <div className="popup-button-group">
                    <button className="add-resource-button" onClick={() => this.handleAdd()}>
                        Add Resources
                    </button>
                    <button className="cancel-button" onClick={() => this.handleCancel()}>
                        Cancel
                    </button>
                </div>
            </div>
        ) : null;

        return [
            this.props.children,
            ReactDOM.createPortal(popup, document.getElementsByTagName('body')[0]),
        ];
    }
}
