import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IReport } from 'app/shared/model/report.model';
import { ReportService } from './report.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';

@Component({
    selector: 'jhi-report-update',
    templateUrl: './report-update.component.html'
})
export class ReportUpdateComponent implements OnInit {
    report: IReport;
    isSaving: boolean;

    employees: IEmployee[];
    reportDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private reportService: ReportService,
        private employeeService: EmployeeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ report }) => {
            this.report = report;
        });
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.report.id !== undefined) {
            this.subscribeToSaveResponse(this.reportService.update(this.report));
        } else {
            this.subscribeToSaveResponse(this.reportService.create(this.report));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReport>>) {
        result.subscribe((res: HttpResponse<IReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
