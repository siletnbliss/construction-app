import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/common/application/services/env.service';

@Injectable()
export class FirebaseConfigService {
  constructor(private envService: EnvService) {}

  getConfig() {
    return {
      apiKey: this.envService.get('FIREBASE_API_KEY'),
      authDomain: this.envService.get('FIREBASE_AUTH_DOMAIN'),
      projectId: this.envService.get('FIREBASE_PROJECT_ID'),
      storageBucket: this.envService.get('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.envService.get('FIREBASE_MESSAGE_SENDER_ID'),
      appId: this.envService.get('FIREBASE_APP_ID'),
      measurementId: this.envService.get('FIREBASE_MEASUREMENT_ID'),
    };
  }
}
