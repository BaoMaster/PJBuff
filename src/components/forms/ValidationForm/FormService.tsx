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
  protected baseUri = '/v1';

  public upLoadPost(Content: any, Image: any) {
    let body = new URLSearchParams();
    body.set('content', Content);
    body.set('picture1', Image);
    return this.fetch.post(`${this.baseUri}/up_post`, body);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
