import * as React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';
import './Header.scss';
import logo from '../../logo.svg';

type MenuItem = {
    icon: string,
    label: string,
}

export default class Header extends React.Component {
    private menu: MenuItem[] = [
        { icon: 'icon-id-card', label: 'Profile' },
        { icon: 'icon-sign-in', label: 'Sign Out' },
    ];

    public renderUserMenuList() {
        return (
            <div className="user-menu-area">
                <div className="user-avatar">
                    <span className="avatar-img"></span>
                    <span className="iconfont icon-angle-down"></span>
                </div>
                <ul className="user-menu-list">
                    {this.menu && this.menu.length && this.menu.map((item, index) => (
                        <li className="user-menu-item" key={index}>
                            <span className={`iconfont ${item.icon}`}></span>
                            <span className="menu-label">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    public render() {
        return (
            <header className="cruise-header">
                <Wrapper className="header-wrapper">
                    <Link to="/" className="logo">
                        <img src={logo}></img>
                    </Link>
                    {this.renderUserMenuList()}
                </Wrapper>
            </header>
        );
    }
}
