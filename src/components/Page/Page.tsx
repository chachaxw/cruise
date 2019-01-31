import * as React from 'react';
import Menu, { MenuItem } from '../Menu/Menu';
import Header from '../Header/Header';
import Wrapper from '../Wrapper/Wrapper';
import Footer from '../Footer/Footer';
import './Page.scss';

export default function Page(props: React.Props<any> & React.HTMLProps<any>) {

    const menu: MenuItem[] = [
        { to: '/index', icon: 'icon-dashboard', name: 'DASHBOARD' },
        { to: '/agent', icon: 'icon-sitemap', name: 'AGENT' },
        { to: '/myCruise', icon: 'icon-boat', name: 'MY CRUISE' },
        { to: '/help', icon: 'icon-life-bouy', name: 'HELP' },
    ];

    return (
        <div className={`cruise-page ${props.className}`}>
            <Header></Header>
            <Wrapper className="wrapper">
                <div className="left-side">
                    <Menu menu={menu}></Menu>
                </div>
                <div className="right-side">
                    {props.children}
                </div>
            </Wrapper>
            <Footer></Footer>
        </div>
    );
}
