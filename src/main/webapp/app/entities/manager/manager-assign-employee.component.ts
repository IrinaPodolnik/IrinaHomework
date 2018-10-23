import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IReport } from 'app/shared/model/report.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';
import {IManager} from "app/shared/model/manager.model";
import {ManagerService} from "app/entities/manager/manager.service";

@Component({
    selector: 'jhi-manager-assign-employee',
    templateUrl: './manager-assign-employee.component.html'
})
export class ManagerAssignEmployeeComponent implements OnInit {

    isSaving: boolean;

    employee: IEmployee;

    manager: IManager;
    employees: IEmployee[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private employeeService: EmployeeService,
        private managerService: ManagerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ manager }) => {
            this.manager = manager;
        });
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                this.employees = res.body.filter(employee => employee.id != this.manager.id);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(this.managerService.addEmployeeToManager(this.manager.id, this.employee.id));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }
}
