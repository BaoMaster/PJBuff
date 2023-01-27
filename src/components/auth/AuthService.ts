import BaseService from '../../config/_BaseService';

class AuthService extends BaseService<any> {
  protected baseUri = 'api/v2';

  public login(data: any) {
    return this.fetch.post(`${this.baseUri}/login`, data);
  }
  public register(data: any) {
    return this.fetch.post(`${this.baseUri}/register`, data);
  }
  public verifyToken() {
    return this.fetch.get(`${this.baseUri}/userinfo`);
  }
}

const scenarioService = new AuthService();
export default scenarioService;
