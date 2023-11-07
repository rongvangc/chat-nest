import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  private readonly pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APPID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: true,
    });
  }

  trigger(
    channel: string | string[],
    event: string,
    data: any,
    params?: Pusher.TriggerParams,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pusher
        .trigger(channel, event, data, params)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
