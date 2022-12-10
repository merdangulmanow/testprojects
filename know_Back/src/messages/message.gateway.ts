import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreateMessageDTO } from './dto/create.message.dto';
import { MessagesService } from './messages.service';
import { HelperService } from 'src/helper/helper.service';
import { MessagesModel } from './models/messages.model';
import { UserModel } from 'src/users/modesl/users.model';

@WebSocketGateway()
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	constructor ( 
		private readonly messageService : MessagesService,
		private readonly helpserService : HelperService
	){}

	private logger: Logger = new Logger('MessagesGateway');
	@WebSocketServer() wss: Server;
  
  	afterInit(server: any) {
		this.logger.log('Initialize ChatGateway!');
		return false
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
		return false
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
		return false
	}

	/// kogda user, author pishet moderatoru
	@SubscribeMessage('chatToModerator')
	public async handleChatModerator( client: Socket, dto : CreateMessageDTO ) {
		try {
			const data : MessagesModel = await this.messageService.createMessage(dto)
			this.logger.log(`.............. serder client id==> ${client.id}`)
			this.wss.in("moderators").emit('message', { data }) 
		} catch(err) {
			console.log(err);
		}
		return false
	}

	/// kogda user, author pishet moderatoru
	@SubscribeMessage('chatToUser')
	public async handleChatUser( client: Socket, dto : CreateMessageDTO ) {
		try {
			const data : MessagesModel = await this.messageService.createMessage(dto)
			this.logger.log(`.............. serder client id==> ${client.id}`)
			client.join(`group_${data.groupdId}`);
			this.wss.in(`group_${data.groupdId}`).emit('message', { data }) 
		} catch(err) {
			console.log(err);
		}
	}

	//// podklyuchayetsya novyy moderator
	@SubscribeMessage('joinModerator')
	handleJoinRoom(client: Socket) {
		client.join('moderators');
		client.emit('joinedModerator', 'moderators');
	}

	

}
