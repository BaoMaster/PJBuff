import BaseService from '../../config/_BaseService';

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class ScenarioService extends BaseService<any> {
  public getListHistory(startDay: any, endDay: any) {
    return this.fetch.get(`/api/v2/order/history/list?fromDay=${startDay}&toDay=${endDay}`);
  }
  public restoreOrder(orderId: any) {
    return this.fetch.get(`/api/v2/order/restore?order_id=${orderId}`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
