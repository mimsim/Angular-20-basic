export interface Task {
    id: string;
    userId: string;
    title: string;
    summary?: string;
    dueDate?: string;
    body?: string;
    completed?: boolean;
}

export interface NewTaskData {
    // title: string;
    // summary: string;
    // date: string;
    title: string | null;
    body: string | null;
    userId: string | null;

    // start?: Date | null;
    // end?: Date | null;

}
