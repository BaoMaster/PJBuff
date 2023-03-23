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
}

const scenarioService = new ScenarioService();
export default scenarioService;
