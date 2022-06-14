import { Controller, Get, Response, StreamableFile } from '@nestjs/common'
import { createReadStream } from 'fs'
import { join } from 'path'

import { StoreService } from './store.service'

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('all')
  getAll(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), './data/db.json'))
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="db.json"',
    })

    return new StreamableFile(file)
  }
}
