import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

export type MenuItem = {
    to: string,
    icon: string,
    name: string,
}

interface InternalProps {
    menu: MenuItem[];
}

export default class Menu extends React.Component<InternalProps> {

    public renderMenuItem(props: MenuItem, index: number) {
        return (
            <li key={index} className="cruise-menu-item">
                <NavLink to={props.to} activeClassName="active">
                    <span className={`iconfont ${props.icon}`} ></span>
                    <span>{props.name}</span>
                </NavLink>
            </li>
        );
    }

    public render() {
        const { menu } = this.props;

        return (
            <div className="cruise-menu">
                <ul>
                    {menu && menu.length && menu.map((item: MenuItem, index: number) => (
                        this.renderMenuItem(item, index)
                    ))}
                </ul>
            </div>
        );
    }
}
