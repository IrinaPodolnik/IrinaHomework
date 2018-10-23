import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model//employee.model';

export interface ITask {
    id?: number;
    taskText?: string;
    assignDate?: Moment;
    dueDate?: Moment;
    employee?: IEmployee;
    creator?: IEmployee;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public taskText?: string,
        public assignDate?: Moment,
        public dueDate?: Moment,
        public employee?: IEmployee,
        public creator?: IEmployee
    ) {}
}
