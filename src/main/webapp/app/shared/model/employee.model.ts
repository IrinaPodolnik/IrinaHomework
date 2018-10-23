import { IEmployee } from 'app/shared/model//employee.model';
import { ITask } from 'app/shared/model//task.model';
import { IReport } from 'app/shared/model//report.model';

export interface IEmployee {
    id?: number;
    firstName?: string;
    lastName?: string;
    position?: string;
    assineTasks?: ITask[];
}

export class Employee implements IEmployee {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public position?: string,
        public assineTasks?: ITask[],
    ) {}
}
