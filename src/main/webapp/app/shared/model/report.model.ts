import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model//employee.model';

export interface IReport {
    id?: number;
    reportText?: string;
    reportDate?: Moment;
    employee?: IEmployee;
    reportFrom?: IEmployee;
}

export class Report implements IReport {
    constructor(
        public id?: number,
        public reportText?: string,
        public reportDate?: Moment,
        public employee?: IEmployee,
        public reportFrom?: IEmployee
    ) {}
}
