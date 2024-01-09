export interface CreateProject
  extends Omit<Project, 'id' | 'images' | 'ownerId' | 'owner'> {
  images: File[];
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  location: string;
  startDate: string;
  finishDate: string;
  ownerId: string;
  images: { url: string }[];
  items: ProjectItem[];
  owner: { name: string; email: string };
}

export interface ProjectItem {
  name: string;
  quantity: number;
  unitPrice: number;
}
