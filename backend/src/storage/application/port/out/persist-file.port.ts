export interface PersistFilePortDto {
  name: string;
  url: string;
}

export interface PersistFilePortResponse extends PersistFilePortDto {
  id: string;
}
export abstract class PersistFilePort {
  abstract save(
    ...dto: PersistFilePortDto[]
  ): Promise<PersistFilePortResponse[]>;
}
