import BaseService from '../../config/_BaseService';

class AuthService extends BaseService<any> {
  protected baseUri = '/v1';

  public login(data: any) {
    let body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);

    return this.fetch.post(`${this.baseUri}/login`, body);
  }
  public register(data: any) {
    return this.fetch.post(`${this.baseUri}/register`, data);
  }
  public verifyToken() {
    return this.fetch.post(`${this.baseUri}/get_user_info_by_token`);
  }
}

const scenarioService = new AuthService();
export default scenarioService;
