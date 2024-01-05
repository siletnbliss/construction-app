import { Injectable } from '@nestjs/common';
import { HashUseCase } from '../port/in/hash.use-case';
import * as bcrypt from 'bcrypt';
import { EnvService } from 'src/common/application/services/env.service';

@Injectable()
export class HashService implements HashUseCase {
  private saltRounds: number;
  constructor(private envService: EnvService) {
    this.saltRounds = parseInt(this.envService.get('ENCRYPT_SALT_ROUNDS'));
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.saltRounds);
    return hash;
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed);
  }
}
