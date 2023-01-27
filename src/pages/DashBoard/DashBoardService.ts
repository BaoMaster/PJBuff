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
  protected baseUri = 'data/setting';

  public getComputerRunning() {
    return this.fetch.get(`/api/v2/computer/list`);
  }
  public getListHistory(startDay: any, endDay: any) {
    return this.fetch.get(`api/v2/order/history/list?fromDay=${startDay}&toDay=${endDay}`);
  }
  public getSubscribeByDays(startDay: any, endDay: any) {
    return this.fetch.get(`/data/report?from=${startDay}&to=${endDay}`);
  }

  public getChannelRunning() {
    return this.fetch.get(`/api/v2/order/list?state=running`);
  }

  public getChannelCompleted() {
    return this.fetch.get(`/api/v2/order/list?state=completed`);
  }

  public getChannelCancel() {
    return this.fetch.get(`/api/v2/order/list?state=cancel`); 
  }
  
  public getChannelPending() {
    return this.fetch.get(` /api/v2/order/list?state=pending`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
