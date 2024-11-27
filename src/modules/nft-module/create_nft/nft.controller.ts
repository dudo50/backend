import { Controller, Body, Put, UseGuards, BadRequestException, Param, Get } from '@nestjs/common';
import { NftCreator } from './nft.service';
import { NftDto, NftDBDto, NftUpdateDto } from './dto/NFTDto';
import { NFTResponseDto } from './dto/NFTResponseDto';
import { SessionAuthGuard, GetUserId } from '@modules/auth/helpers';
import * as mapper from '@modules/main/contracts/admin/read/mapper';
import { Wallet } from '@modules/app-db/entities';

@UseGuards(SessionAuthGuard)
@Controller('nft')
export class NftController {
  constructor(private readonly appService: NftCreator) { }

  @Put('create/collection/:collectionId/artwork/:artworkId')
  async nftCreate(@Param("collectionId") collectionId: string, @Param("artworkId") artworkId: string, @Body() form: NftDto, @GetUserId() userId: string): Promise<NFTResponseDto> {
    const { address } = form;
    const callData = await this.appService.createNFTCall(collectionId, artworkId, address, userId);
    if (callData == null) {
      throw new BadRequestException('An error occurred while creating nft call, please check your parameters');
    }
    else {
      return { callData }
    }
  }

  @Put('update/nft/:artworkId')
  async updateNft(@Param("artworkId") artworkId: string, @GetUserId() userId: string, @Body() form: NftUpdateDto): Promise<NFTResponseDto> {
    const callData = await this.appService.updateNFTCall(form, artworkId, userId);
    if (callData == null) {
      throw new BadRequestException('An error occurred while updating nft call, please check your parameters');
    }
    else {
      return { callData }
    }
  }

  @Put('create/id/:nftID/wallet/:walletAddr/artwork/:artworkId')
  async nftCreateDB(@Param("nftID") nftID: string, @Param("walletAddr") walletAddr: string, @Param("artworkId") artworkId: string, @Body() form: NftDBDto, @GetUserId() userId: string): Promise<NFTResponseDto> {
    const { ipfsLink } = form;
    const callData = await this.appService.createNftInDB(nftID, ipfsLink, walletAddr, artworkId, userId);
    if (callData == null) {
      throw new BadRequestException('An error occurred while creating nft call, please check your parameters');
    }
    else {
      return { callData }
    }
  }

  @Get('wallet/eva')
  async getEvaWalletDetail() {
    const item = await this.appService.getEvaWalletDetail();
    if (item == null)
      throw new BadRequestException('An error occurred while creating nft call, please check your parameters');
    return mapper.createWalletDetailDto(item);
  }

  @Put('create/wallet/:walletAddr')
  async createWallet(@Param("walletAddr") walletAddr: string, @GetUserId() userId: string): Promise<Wallet> {
    const callData = await this.appService.createWallet(walletAddr, userId);
    if (callData == null) {
      throw new BadRequestException('An error occurred while creating wallet, please check your parameters');
    }
    else {
      return callData;
    }
  }
}