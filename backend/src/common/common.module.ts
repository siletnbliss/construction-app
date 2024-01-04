import { Global, Module } from '@nestjs/common';
import { EnvService } from './services/env.service';

@Global()
@Module({ providers: [EnvService] })
export class CommonModule {}
