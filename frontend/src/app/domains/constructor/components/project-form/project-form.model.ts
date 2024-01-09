import { TuiDay } from '@taiga-ui/cdk';

export interface ProjectFormValues {
  title: string | null;
  location: string | null;
  description: string | null;
  startDate: TuiDay | null;
  finishDate: TuiDay | null;
  images: File[] | null;
}
