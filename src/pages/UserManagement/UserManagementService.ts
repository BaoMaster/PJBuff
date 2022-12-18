import BaseService from "../../config/_BaseService";

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class UserManagementService extends BaseService<any> {
  protected baseUri = "admin/user";

  public getUserList() {
    return this.fetch.get(`${this.baseUri}/list`);
  }
  public updateUserInfo(data:any) {
    return this.fetch.post(`${this.baseUri}/update`, data);
  }
  public getPointHistory(userId:number) {
    return this.fetch.get(`user/list-point/${userId}`);
  }
  public addPoint(data:any) {
    return this.fetch.post(`${this.baseUri}/add-point`, data);
  }
}

const userManagementService = new UserManagementService();
export default userManagementService;
