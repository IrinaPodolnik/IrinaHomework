import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IManager } from 'app/shared/model/manager.model';
import { Principal } from 'app/core';
import {ManagerService} from './manager.service';

@Component({
    selector: 'jhi-manager',
    templateUrl: './manager.component.html'
})
export class ManagerComponent implements OnInit, OnDestroy {
    managers: IManager[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private standardDeviation: number;

    constructor(
        private managerService: ManagerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.managerService.query().subscribe(
            (res: HttpResponse<IManager[]>) => {
                this.managers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.managerService.standardDeviation().subscribe(x =>
            this.standardDeviation = x.body
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IManager) {
        return item.id;
    }

    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('managerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
