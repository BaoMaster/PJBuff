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
}

const scenarioService = new ScenarioService();
export default scenarioService;
