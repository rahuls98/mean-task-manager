export class Task {
    _id?: string;
    title: string;
    dueDate: Date;
    priority: string;
    label: string;
    status: string;
    isDone: boolean;
    gamification: {
        firstCheck: Date,
        score: number
    };
}
