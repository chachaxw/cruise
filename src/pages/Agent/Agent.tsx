import * as React from 'react';
import { NavTab, Page, Search, Popup } from '../../components';
import { API } from '../../api/index';
import './Agent.scss';

enum AgentType {
    PHYSICAL = 'physical',
    VIRTUAL = 'virtual',
}

enum AgentStatus {
    BUILDING = 'building',
    IDLE = 'idle',
}

type AgentItem = {
    id: number,
    name: string,
    os: string,
    status: 'building' | 'idle',
    type: 'physical' | 'virtual',
    ip: string,
    location: '',
    resources: string[],
}

interface InternalState {
    agentId: number | null;
    idleNum: number;
    buildingNum: number;
    agents: AgentItem[];
    physical: AgentItem[];
    virtual: AgentItem[];
    agentsList: AgentItem[];
    popupVisible: boolean;
}

export default class Agent extends React.Component<any, InternalState> {
    private tabList = [
        { label: 'all', value: 0 },
        { label: 'physical', value: 1 },
        { label: 'virtual', value: 2 },
    ];

    constructor(props: any) {
        super(props);
    
        this.state = {
            agents: [],
            physical: [],
            virtual: [],
            agentsList: [],
            buildingNum: 0,
            idleNum: 0,
            agentId: null,
            popupVisible: false,
        };
    }

    public async componentDidMount() {
        const response = await API.getAgentsList();

        let physical: AgentItem[] = [],
            virtual: AgentItem[] = [],
            buildingNum = 0,
            idleNum = 0;

        response.map((item: any) => {
            if (item.type === AgentType.PHYSICAL) {
                physical.push(item);
            }

            if (item.type === AgentType.VIRTUAL) {
                virtual.push(item);
            }
            buildingNum += item.status === AgentStatus.BUILDING ? 1 : 0;
            idleNum += item.status === AgentStatus.IDLE ? 1 : 0;

            return item;
        });

        this.setState({
            physical,
            virtual,
            buildingNum,
            idleNum,
            agents: response as AgentItem[],
            agentsList: response as AgentItem[],
        });
    }

    public switchListType(value: 'list' | 'card') {
        console.log('List style', value);
    }

    public handleTabChange(value: number) {
        const { physical, virtual, agents } = this.state;
        const active = this.tabList.find(item => item.value === value);
        
        if (!active) {
            return;
        }

        if (active.label === AgentType.PHYSICAL) {
            this.setState({ agentsList: physical });
        } else if (active.label === AgentType.VIRTUAL) {
            this.setState({ agentsList: virtual });
        } else {
            this.setState({ agentsList: agents });
        }
    }

    public handleSearch(value: string) {
        const { agents } = this.state;
        const matched = [];

        for (var i = 0; i < agents.length; i++) {
            if (agents[i].name.match(value) != null) {
                matched.push(agents[i]);
            }
        }

        this.setState({ agentsList: matched });
    }

    public handlePopup(id: number) {
        // console.log('this is a test', id);
        this.setState({ agentId: id, popupVisible: true });
    }

    public async addResource(value: string) {
        const { agentId, agents } = this.state;

        if (!agentId) {
            return;
        }

        const resources = value.split(',').map(item => item.trim()).filter(item => item !== '');

        const list = agents.map((item: AgentItem) => {
            if (item.id === agentId) {
                item.resources = item.resources.concat(resources);
            }
            return item;
        });

        const agent = list.find(item => item.id === agentId);
        const response = await API.putAgent(agentId, agent);

        if (response) {
            this.setState({ agentsList: list, popupVisible: false });
        }
    }

    public async removeResource(id: number, index: number) {
        let { agents } = this.state;

        agents = agents.map((item: AgentItem) => {
            if (item.id === id) {
                item.resources = item.resources.filter((d, i) => i !== index);
            }
            return item;
        });

        const agent = agents.find(item => item.id === id);
        const response = await API.putAgent(id, agent);

        if (response) {
            this.setState({ agents });   
        }
    }

    public renderCard(props: any) {
        return (
            <div className="card overview">
                <div className="overview-item">
                    <span>All</span>
                    <span>{props.physicalNum + props.virtualNum}</span>
                </div>
                <div className="overview-item">
                    <span>PHYSICAL</span>
                    <span>{props.physicalNum}</span>
                </div>
                <div className="overview-item">
                    <span>VIRTUAL</span>
                    <span>{props.virtualNum}</span>
                </div>
            </div>
        );
    }

    public renderCardWithIcon(props: any) {
        return (
            <div className={`card ${props.status === AgentStatus.BUILDING ? 'yellow' : 'green'}`}>
                <div 
                    className={`iconfont ${
                        props.status === AgentStatus.BUILDING ? 'icon-cog animation-spinning' : 'icon-coffee'}`
                    }>
                </div>
                <h1>{props.status}</h1>
                <p>{props.num}</p>
            </div>
        );
    }

    public renderAgentItem(props: any) {
        return (
            <div className="agent-item" key={props.id}>
                <div className="agent-icon">
                    <img 
                        width="100%" height="100%" alt={props.os}
                        src={`${process.env.PUBLIC_URL}/assets/os_icons/${props.os}.png`} 
                    />
                </div>
                <div className="agent-detail">
                    <div className="agent-info">
                        <div className="info-with-icon">
                            <span className="iconfont icon-desktop"></span>
                            <span className="name" title={props.name}>{props.name}</span>
                        </div>
                        <div className={`info-label ${props.status === AgentStatus.BUILDING ? 'yellow' : 'green'}`}>
                            {props.status}
                        </div>
                        <div className="info-with-icon">
                            <span className="iconfont icon-info"></span>
                            <span>{props.ip}</span>
                        </div>
                        <div className="info-with-icon">
                            <span className="iconfont icon-folder"></span>
                            <span className="location" title={props.location}>{props.location}</span>
                        </div>
                    </div>
                    <div className="agent-operation">
                        <div className="button-group">
                            <button className="add-button" onClick={() => this.handlePopup(props.id)}>
                                <span className="iconfont icon-plus"></span>
                            </button>
                            {props.resources && props.resources.length ?
                                props.resources.map((item: string, index: number) => (
                                    <button className="resource-button" key={index} 
                                        onClick={() => this.removeResource(props.id, index)}>
                                        <span>{item}</span>
                                        <span className="iconfont icon-trash"></span>
                                    </button> 
                                )): null
                            }
                        </div>
                        {props.status === AgentStatus.BUILDING ?
                            <button className="deny-button">
                                <span className="iconfont icon-deny"></span>
                                <span>Deny</span>
                            </button> : null
                        }
                    </div>
                </div>
            </div>
        );
    }

    public render() {
        const {
            physical,
            virtual,
            buildingNum,
            idleNum,
            agentsList,
        } = this.state;

        return (
            <Page className="cruise-agent">
                <div className="agent-overview">
                    {this.renderCardWithIcon({ status: AgentStatus.BUILDING, num: buildingNum })}
                    {this.renderCardWithIcon({ status: AgentStatus.IDLE, num: idleNum })}
                    {this.renderCard({ physicalNum: physical.length, virtualNum: virtual.length })}
                </div>
                <div className="agent-navbar">
                    <NavTab 
                        tabList={this.tabList} active={0}
                        onTabChange={(value: number) => this.handleTabChange(value)}>
                    </NavTab>
                    <Search onSearch={(value: string) => this.handleSearch(value)} />
                    <div 
                        className="iconfont list-type icon-th-card" 
                        onClick={() => this.switchListType('card')}>
                    </div>
                    <div
                        className="iconfont list-type icon-th-list active"
                        onClick={() => this.switchListType('list')}>
                    </div>
                </div>
                <div className="agents">
                    {agentsList && agentsList.length ?
                        agentsList.map(item => this.renderAgentItem(item)) : null
                    }
                </div>
                <Popup
                    isVisible={this.state.popupVisible}
                    onCancel={(visible: boolean) => this.setState({ popupVisible: visible })}
                    onAdd={(value) => this.addResource(value)}>
                </Popup>
            </Page>
        );
    }
}
