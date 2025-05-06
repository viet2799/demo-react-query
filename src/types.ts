export interface User {
  id: number;
  name: string;
  email: string;
}

export interface paging {
  page: number;
  pageSize: number;
}

export type GetUsersResponse = {
  data: User[];
  nextPage: number | null;
  hasMore: boolean;
};
