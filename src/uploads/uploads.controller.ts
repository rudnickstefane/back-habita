import { MultipartFile } from '@fastify/multipart';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GraphQLJWTGuard } from '@src/auth/guards';
import { UploadsService } from './uploads.service';

type UploadRequest = {
  files: () => AsyncIterableIterator<MultipartFile>;
};

@Controller('uploads')
export class UploadsController {
  constructor(private readonly service: UploadsService) {}

  @Post('fotos')
  @UseGuards(GraphQLJWTGuard)
  async uploadFotos(@Req() request: UploadRequest) {
    const urls = await this.service.saveFotos(request.files());
    return { urls };
  }
}
