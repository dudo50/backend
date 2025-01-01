import { IsString, IsBooleanString, IsOptional, IsUUID, IsDateString, IsArray } from 'class-validator';
import { EMPTY, AllowEmpty } from '@common/helpers';
import { GalleryId, ArtworkId, UnityRoomId } from '@modules/app-db/entities';

export class CreateExhibitionDto {

  @IsString()
  name: string;

  @IsOptional()
  @AllowEmpty()
  @IsDateString()
  fromDate: string | EMPTY;

  @IsOptional()
  @AllowEmpty()
  @IsDateString()
  toDate: string | EMPTY;

  @IsOptional()
  @IsString()
  curator: string;

  @IsUUID()
  galleryId: GalleryId;

  @IsOptional()
  @AllowEmpty()
  @IsUUID()
  activeRoomId: UnityRoomId | EMPTY;

  @IsOptional()
  @AllowEmpty()
  @IsArray()
  @IsUUID(null, { each: true })
  artworks: ArtworkId[] | EMPTY;

  @IsOptional()
  @IsBooleanString()
  public: string;

}
