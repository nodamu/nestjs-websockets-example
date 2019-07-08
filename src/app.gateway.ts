import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected : `${client.id}`');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected :`${client.id}`');
  }

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClient', data: text };
  }
}
