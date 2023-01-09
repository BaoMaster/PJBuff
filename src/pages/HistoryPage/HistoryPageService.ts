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


  public getListHistory(startDay: any, endDay: any) {
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

  public updateMultiOrder(data: any) {
    return this.fetch.post(`/subscribe/updateMulti`, data);
  }
  public insertOrder(data: any) {
    return this.fetch.post(`/subscribe/insert`, data);
  }

  public deleteMultiOrder(data: any) {
    return this.fetch.post(`/subscribe/deleteMulti`, data);
  }

  public CancelOrder(id: any) {
    return this.fetch.get(`/subscribe/cancelChannel?channel_id=${id}`);
  }

  public ConfirmCancelOrder(id: any, refund:number) {
    return this.fetch.get(`/subscribe/confirmCancel?channel_id=${id}&refund${refund}`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
