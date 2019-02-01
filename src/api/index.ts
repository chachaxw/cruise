import { POST, PUT, GET } from "../utils/request";
import apiConfig from './apiConfig';

export class API {

    static async getAgent(id: number): Promise<Object[]> {
        return await GET(`${apiConfig.agents}/${id}`);
    }

    static async getAgentsList(): Promise<Object[]> {
        return await GET(apiConfig.agents);
    }

    static async postAgent(id: number, params: any): Promise<Object> {
        return await POST(`${apiConfig.agents}/${id}`, params);
    }

    static async putAgent(id: number, params: any): Promise<Object> {
        return await PUT(`${apiConfig.agents}/${id}`, params);
    }

}