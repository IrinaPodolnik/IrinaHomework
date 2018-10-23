import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import {IManager} from "app/shared/model/manager.model";
import {ManagerService} from "app/entities/manager/manager.service";

@Component({
    selector: 'jhi-manager-update',
    templateUrl: './manager-update.component.html'
})
export class ManagerUpdateComponent implements OnInit {
    manager: IManager;
    isSaving: boolean;

    managers: IManager[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private managerService: ManagerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ manager }) => {
            this.manager = manager;
        });
        this.managerService.query().subscribe(
            (res: HttpResponse<IManager[]>) => {
                this.managers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.manager.id !== undefined) {
            this.subscribeToSaveResponse(this.managerService.update(this.manager));
        } else {
            this.subscribeToSaveResponse(this.managerService.create(this.manager));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IManager>>) {
        result.subscribe((res: HttpResponse<IManager>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEmployeeById(index: number, item: IManager) {
        return item.id;
    }
}
