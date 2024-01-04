import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../ts';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  get(key: keyof EnvironmentVariables) {
    return this.configService.get(key, { infer: true });
  }
}
