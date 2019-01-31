import * as React from 'react';
import Menu, { MenuItem } from '../Menu/Menu';
import Header from '../Header/Header';
import History, { HistoryItem } from '../History/History';
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

    const history: HistoryItem[] = [
        { id: 0, name: 'bjstdmngbdr01', status: 'Acceptance_test' },
        { id: 2, name: 'bjstdmngbdr02', status: 'Acceptance_test' },
        { id: 3, name: 'bjstdmngbdr03', status: 'Acceptance_test' },
        { id: 4, name: 'bjstdmngbdr04', status: 'Acceptance_test' },
        { id: 5, name: 'bjstdmngbdr05', status: 'Acceptance_test' },
        { id: 6, name: 'bjstdmngbdr06', status: 'Acceptance_test' },
        { id: 7, name: 'bjstdmngbdr07', status: 'Acceptance_test' },
    ];

    return (
        <div className={`cruise-page ${props.className}`}>
            <Header></Header>
            <Wrapper className="wrapper">
                <div className="left-side">
                    <Menu menu={menu}></Menu>
                    <History history={history}></History>
                </div>
                <div className="right-side">
                    {props.children}
                </div>
            </Wrapper>
            <Footer></Footer>
        </div>
    );
}
