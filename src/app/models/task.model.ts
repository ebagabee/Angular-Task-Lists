export interface Task {
    id: number;
    title: string;
    description?: string;
    deadline?: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
  }
  