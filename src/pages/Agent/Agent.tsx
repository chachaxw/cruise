import * as React from 'react';
import { Page } from '../../components';
import { API } from '../../api/index';
import './Agent.scss';

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
    idleNum: number;
    buildingNum: number;
    agents: AgentItem[];
    physical: AgentItem[];
    virtual: AgentItem[];
}

export default class Agent extends React.Component<any, InternalState> {

    constructor(props: any) {
        super(props);
    
        this.state = {
            physical: [],
            virtual: [],
            buildingNum: 0,
            idleNum: 0,
            agents: [],
        };
    }
    

    public async componentDidMount() {
        const response = await API.getAgentsList();

        let physical: AgentItem[] = [],
            virtual: AgentItem[] = [],
            buildingNum = 0,
            idleNum = 0;

        response.map((item: any) => {
            if (item.type === 'physical') {
                physical.push(item);
            }

            if (item.type === 'virtual') {
                virtual.push(item);
            }
            buildingNum += item.status === 'building' ? 1 : 0;
            idleNum += item.status === 'idle' ? 1 : 0;

            return item;
        });

        this.setState({
            physical,
            virtual,
            buildingNum,
            idleNum,
            agents: response as AgentItem[] 
        });
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
            <div className={`card ${props.status === 'building' ? 'yellow' : 'green'}`}>
                <div 
                    className={`iconfont ${props.status === 'building' ? 'icon-cog animation-spinning' : 'icon-coffee'}`}>
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
                            <span className="name">{props.name}</span>
                        </div>
                        <div className={`info-label ${props.status === 'building' ? 'yellow' : 'green'}`}>
                            {props.status}
                        </div>
                        <div className="info-with-icon">
                            <span className="iconfont icon-info"></span>
                            <span>{props.ip}</span>
                        </div>
                        <div className="info-with-icon">
                            <span className="iconfont icon-folder"></span>
                            <span>{props.ip}</span>
                        </div>
                    </div>
                    <div className="agent-operation">
                        <div className="button-group">
                            <button className="add-button">
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
                        <button className="deny-button">
                            <span className="iconfont icon-deny"></span>
                            <span>Deny</span>
                        </button>
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
            agents,
        } = this.state;

        return (
            <Page className="cruise-agent">
                <div className="agent-overview">
                    {this.renderCardWithIcon({ status: 'building', num: buildingNum })}
                    {this.renderCardWithIcon({ status: 'idle', num: idleNum })}
                    {this.renderCard({ physicalNum: physical.length, virtualNum: virtual.length })}
                </div>
                <div className="agents">
                    {agents && agents.length ?
                        agents.map(item => this.renderAgentItem(item)) : null
                    }
                </div>
            </Page>
        );
    }
}
