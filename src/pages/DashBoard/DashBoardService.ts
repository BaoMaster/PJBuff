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
    return this.fetch.get(`data/computer/running`);
  }

  public getSubscribeByDays(startDay: any, endDay: any) {
    return this.fetch.get(`/data/report?from=${startDay}&to=${endDay}`);
  }

  public getChannelRunning() {
    return this.fetch.get(`/subscribe/getList?state=running`);
  }

  public getChannelCompleted() {
    return this.fetch.get(`/subscribe/getList?state=completed`);
  }

  public getChannelCancel() {
    return this.fetch.get(`/subscribe/getList?state=cancel`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
