import { Kafka } from 'kafkajs';
import BaseService from '../../config/_BaseService';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['149.51.37.29:9092'],
});

const consumer = kafka.consumer({ groupId: '1111' });

export async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: '1eb3abce-ce10-49c6-8ab5-ed69e9f06459_NOTICE', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message?.value?.toString(),
        timestamp: message.timestamp,
        headers: message.headers,
      });
    },
  });
}

export async function run2() {
  await consumer.connect();
  await consumer.subscribe({ topic: '1eb3abce-ce10-49c6-8ab5-ed69e9f06459_SINGLE_INBOX', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message?.value?.toString(),
        timestamp: message.timestamp,
        headers: message.headers,
      });
    },
  });
}

run().catch(console.error);
run2().catch(console.error);

export interface IScenario {
  id: number;
  name: string;
}

export interface ICreateScenario {
  workFlowId?: number;
  name: string;
}

class ScenarioService extends BaseService<any> {
  protected baseUri = 'api/v2/admin/setting';

  public getSetting() {
    return this.fetch.get(`${this.baseUri}`);
  }

  public getAllUsers(data: any) {
    return this.fetch.post(`api/v2/admin/setting`, data);
  }

  public sendMessage(uid: any, cid: any, msg: any, image: any) {
    return this.fetch.post(`${this.baseUri}/duplicate`, image);
  }

  public getAllMessages(id1: any, id2: any) {
    return this.fetch.get(`/scenarioGenerators`);
  }

  public getSchedules() {
    return this.fetch.get(`${this.baseUri}`);
  }

  public getDetail(id: number) {
    return this.fetch.get(`/generators/scenario/${id}`);
  }

  public createScenario(data: { name: string }) {
    return this.fetch.post(`/scenarioGenerators/create`, data);
  }

  public deleteScenario(id: number) {
    return this.fetch.delete(`/generators/scenario/${id}`);
  }
}

const scenarioService = new ScenarioService();
export default scenarioService;
