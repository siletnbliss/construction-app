import { Project, ProjectItem } from './project';

export interface Application {
  date: string;
  items: ApplicationItem[];
  provider: {
    email: string;
    name: string;
  };

  project: Project;
}

export interface CreateApplication {
  items: {
    itemId: string;
    unitPrice?: number | null;
  }[];
}

export interface ApplicationItem {
  itemId: string;
  unitPrice?: number;
  projectItem: ProjectItem;
}
