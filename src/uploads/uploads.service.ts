import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { MultipartFile } from '@fastify/multipart';
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { pipeline } from 'stream/promises';
import { randomUUID } from 'crypto';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

@Injectable()
export class UploadsService implements OnModuleInit {
  private readonly fotosDir = join(process.cwd(), 'uploads', 'fotos');

  async onModuleInit() {
    await mkdir(this.fotosDir, { recursive: true });
  }

  async saveFotos(files: AsyncIterableIterator<MultipartFile>): Promise<string[]> {
    const urls: string[] = [];

    for await (const file of files) {
      const mime = file.mimetype?.toLowerCase() ?? '';
      const ext = extname(file.filename || '').toLowerCase() || this.extFromMime(mime);

      if (!ALLOWED_MIME.has(mime) || !ALLOWED_EXT.has(ext)) {
        throw new BadRequestException('Envie apenas imagens JPG, PNG, WEBP ou GIF.');
      }

      const name = `${randomUUID()}${ext === '.jpeg' ? '.jpg' : ext}`;
      await pipeline(file.file, createWriteStream(join(this.fotosDir, name)));
      urls.push(`/uploads/fotos/${name}`);
    }

    if (urls.length === 0) {
      throw new BadRequestException('Envie ao menos uma foto.');
    }

    return urls;
  }

  private extFromMime(mime: string) {
    if (mime === 'image/jpeg') return '.jpg';
    if (mime === 'image/png') return '.png';
    if (mime === 'image/webp') return '.webp';
    if (mime === 'image/gif') return '.gif';
    return '';
  }
}
