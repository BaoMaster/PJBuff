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

  public upLoadPost(content: any, idCardBase64: string) {
    console.log(idCardBase64);

    const body = new URLSearchParams();
    body.set('content', content);
    body.set('picture1', idCardBase64);
    return this.fetch.post(`${this.baseUri}/up_post`, body);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
