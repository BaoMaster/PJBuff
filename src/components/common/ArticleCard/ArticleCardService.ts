import BaseService from '../../../config/_BaseService';

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

  public getNewImg(img: string) {
    
    return this.fetch.get(`/v1/get_img?name=${img}`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
