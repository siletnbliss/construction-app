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
}

export interface ProjectItem {
  name: string;
  quantity: number;
  unitPrice: number;
}
