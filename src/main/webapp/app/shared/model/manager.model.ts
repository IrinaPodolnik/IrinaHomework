import { IEmployee } from 'app/shared/model//employee.model';
import { ITask } from 'app/shared/model//task.model';
import { IReport } from 'app/shared/model//report.model';

export interface IManager extends IEmployee{
    id?: number;
    firstName?: string;
    lastName?: string;
    position?: string;
    assineTasks?: ITask[];
    subordinates?:IEmployee[];
    subordinatersReports?:IReport[];

}

export class Manager implements IEmployee {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public position?: string,
        public assineTasks?: ITask[],
        public subordinates?: IEmployee[],
        public subordinatersReports?: IReport[],
    ) {}
}
