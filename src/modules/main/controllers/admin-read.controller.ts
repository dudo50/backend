import { Controller, Get, Param, NotFoundException, Response, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { AdminRepository } from '@modules/app-db/repositories';
import { AuthGuard, UserId } from '@modules/auth/helpers';
import { mapAsync, mapOptionsAsync } from '@common/helpers';
import * as mapper from '../contracts/admin/read/mapper';

@UseGuards(AuthGuard)
@Controller('admin')
export class AdminReadController {

  constructor(private adminRepository: AdminRepository) {
  }

  @Get('user')
  async getUser(@UserId() userId: string) {
    return this.adminRepository.getUser(userId).then(user => mapper.createUserDto(user));
  }

  @Get('user/avatar')
  async getUserAvatar(@UserId() userId: string, @Response() res: ExpressResponse) {
    const item = await this.adminRepository.getUserAvatar(userId);
    if (item == null)
      throw new NotFoundException();
    res.set({ "Content-Type": item.mimeType }).send(item.image);
  }

  @Get('artist')
  async getArtists(@UserId() userId: string) {
    return mapAsync(this.adminRepository.getArtists(userId), mapper.createArtistDto);
  }

  @Get('artwork')
  async getArtworks(@UserId() userId: string) {
    return mapAsync(this.adminRepository.getArtworks(userId), mapper.createArtworkDto);
  }

  @Get('gallery')
  async getGalleries(@UserId() userId: string) {
    return mapAsync(this.adminRepository.getGalleries(userId), mapper.createGalleryDto);
  }

  @Get('exhibition')
  async getExhibitions(@UserId() userId: string) {
    return mapAsync(this.adminRepository.getExhibitions(userId), mapper.createExhibitionDto);
  }

  @Get('room')
  async getRooms(@UserId() userId: string) {
    return mapAsync(this.adminRepository.getRooms(userId), mapper.createRoomDto);
  }

  @Get('artist/:id')
  async getArtistDetail(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    const artist = await this.adminRepository.getArtistDetail(userId, id);
    if (artist == null)
      throw new NotFoundException();
    return mapper.createArtistDetailDto(artist);
  }

  @Get('artwork/:id')
  async getArtworkDetail(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    const artwork = await this.adminRepository.getArtworkDetail(userId, id);
    if (artwork == null)
      throw new NotFoundException();
    return mapper.createArtworkDetailDto(artwork);
  }

  @Get('gallery/:id')
  async getGalleryDetail(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    const gallery = await this.adminRepository.getGalleryDetail(userId, id);
    if (gallery == null)
      throw new NotFoundException();
    return mapper.createGalleryDetailDto(gallery);
  }

  @Get('exhibition/:id')
  async getExhibitionDetail(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    const exhibition = await this.adminRepository.getExhibitionDetail(userId, id);
    if (exhibition == null)
      throw new NotFoundException();
    return mapper.createExhibitionDetailDto(exhibition);
  }

  @Get('artwork/:id/exhibition')
  async getArtworkExhibitions(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    if (!await this.adminRepository.hasArtwork(userId, id))
      throw new NotFoundException();
    return mapAsync(this.adminRepository.getArtworkExhibitions(userId, id), mapper.createArtworkExhibitionDto);
  }

  @Get('exhibition/:id/artwork')
  async getExhibitionArtworks(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    if (!await this.adminRepository.hasExhibition(userId, id))
      throw new NotFoundException();
    return mapAsync(this.adminRepository.getExhibitionArtworks(userId, id), mapper.createExhibitionArtworkDto);
  }

  @Get('exhibition/:id/room')
  async getExhibitionRooms(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    if (!await this.adminRepository.hasExhibition(userId, id))
      throw new NotFoundException();
    return mapAsync(this.adminRepository.getExhibitionRooms(userId, id), mapper.createExhibitionRoomDto);
  }

  @Get('artist/:id/artwork')
  async getArtistArtworks(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    if (!await this.adminRepository.hasArtist(userId, id))
      throw new NotFoundException();
    return mapAsync(this.adminRepository.getArtistArtworks(userId, id), mapper.createArtistArtworkDto);
  }

  @Get('gallery/:id/exhibition')
  async getGalleryExhibitions(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    if (!await this.adminRepository.hasGallery(userId, id))
      throw new NotFoundException();
    return mapAsync(this.adminRepository.getGalleryExhibitions(userId, id), mapper.createGalleryExhibitionDto);
  }

  @Get('options/country')
  async getCountryOptions() {
    return mapAsync(this.adminRepository.getCountryOptions(), mapper.createCountryDto);
  }

  @Get('options/artist_category')
  async getArtistCategoryOptions() {
    return mapOptionsAsync(this.adminRepository.getArtistCategoryOptions());
  }

  @Get('options/artwork_technique')
  async getArtworkTechniqueOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkTechniqueOptions());
  }

  @Get('options/artwork_material')
  async getArtworkMaterialOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkMaterialOptions());
  }

  @Get('options/artwork_genre')
  async getArtworkGenreOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkGenreOptions());
  }

  @Get('options/artwork_worktype')
  async getArtworkWorktypeOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkWorktypeOptions());
  }

  @Get('options/gallery')
  async getGalleryOptions(@UserId() userId: string) {
    return mapOptionsAsync(this.adminRepository.getGalleryOptions(userId));
  }

  @Get('options/artwork')
  async getArtworkOptions(@UserId() userId: string) {
    return mapOptionsAsync(this.adminRepository.getArtworkOptions(userId));
  }

  @Get('options/artist')
  async getArtistOptions(@UserId() userId: string) {
    return mapOptionsAsync(this.adminRepository.getArtistOptions(userId));
  }

  @Get('options/exhibition')
  async getExhibitionOptions(@UserId() userId: string) {
    return mapOptionsAsync(this.adminRepository.getExhibitionOptions(userId));
  }

  @Get('artwork/:id/image')
  async getArtworkImage(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string, @Response() res: ExpressResponse) {
    const item = await this.adminRepository.getArtworkImage(userId, id);
    if (item == null)
      throw new NotFoundException();
    res.set({ "Content-Type": item.mimeType }).send(item.image);
  }

  @Get('artwork/:id/thumbnail')
  async getArtworkThumbnail(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string, @Response() res: ExpressResponse) {
    const item = await this.adminRepository.getArtworkThumbnail(userId, id);
    if (item == null)
      throw new NotFoundException();
    res.set({ "Content-Type": item.mimeType }).send(item.image);
  }

  @Get('artwork/:id/unity-image')
  async getArtworkUnityImage(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string, @Response() res: ExpressResponse) {
    const item = await this.adminRepository.getArtworkUnityImage(userId, id);
    if (item == null)
      throw new NotFoundException();
    res.set({ "Content-Type": item.mimeType }).send(item.image);
  }

  @Get('nft')
  async getNfts(@UserId() userId: string) {
    return mapAsync(this.adminRepository.getNfts(userId), mapper.createNftDto);
  }

  @Get('nft/:id')
  async getNftDetail(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    const item = await this.adminRepository.getNftDetail(userId, id);
    if (item == null)
      throw new NotFoundException();
    return mapper.createNftDetailDto(item);
  }

  @Get('designer/room/:id')
  async getDesignerRoom(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    const room = await this.adminRepository.getDesignerRoom(userId, id);
    if (room == null)
      throw new NotFoundException();
    return mapper.createDesignerRoomDto(room);
  }

  @Get('designer/room/:id/artwork')
  async getDesignerRoomArtworks(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    const info = await this.adminRepository.getRoomExhibitionInfo(userId, id);
    if (info == null)
      throw new NotFoundException();
    const artworks = this.adminRepository.getExhibitionArtworks(userId, info.exhibition.id);
    return mapAsync(artworks, (artwork) => mapper.createDesignerArtworkDto(artwork, info.exhibition));
  }

  @Get('designer/library')
  async getDesignerItemLibrary() {
    return mapAsync(this.adminRepository.getItemTypes(), mapper.createDesignerLibraryItemDto);
  }

}