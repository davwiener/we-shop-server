import { PipeTransform, BadRequestException } from "@nestjs/common";
import { AuctionStatus } from "../auction.model";

export class AuctionStatusValidationPipe implements PipeTransform{
	readonly allowdStatuses = [
			AuctionStatus.PENDING,
			AuctionStatus.LIVE,
			AuctionStatus.ENDED
	]

	transform(value: any) {
		value = value.toUpperCase()
		if (!(this.allowdStatuses.indexOf(value) >= 0)) {
			throw new BadRequestException(`${value} is invalid`)	
		}
	}
}