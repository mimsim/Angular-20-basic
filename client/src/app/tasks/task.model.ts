export interface Task {
    id: string;
    _id?: string;
    userId: string;
    title: string;
    summary?: string;
    dueDate?: string;
    body?: string;
    completed?: boolean;
}

export interface NewTaskData {    
    title: string | null;
    description: string | null;  
    completed: boolean;
    userId: string;
}
