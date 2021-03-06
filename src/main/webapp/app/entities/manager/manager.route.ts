import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {IManager, Manager} from "app/shared/model/manager.model";
import {ManagerService} from "app/entities/manager/manager.service";
import {ManagerComponent} from "app/entities/manager/manager.component";
import {ManagerDetailComponent} from "app/entities/manager/manager-detail.component";
import {ManagerUpdateComponent} from "app/entities/manager/manager-update.component";
import {ManagerDeletePopupComponent} from "app/entities/manager/manager-delete-dialog.component";
import {ManagerAssignEmployeeComponent} from "app/entities/manager/manager-assign-employee.component";

@Injectable({ providedIn: 'root' })
export class ManagerResolve implements Resolve<IManager> {
    constructor(private service: ManagerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((manager: HttpResponse<Manager>) => manager.body));
        }
        return of(new Manager());
    }
}

export const managerRoute: Routes = [
    {
        path: 'manager',
        component: ManagerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'manager/:id/view',
        component: ManagerDetailComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'manager/:id/employee',
        component: ManagerAssignEmployeeComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'manager/new',
        component: ManagerUpdateComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'manager/:id/edit',
        component: ManagerUpdateComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const managerPopupRoute: Routes = [
    {
        path: 'manager/:id/delete',
        component: ManagerDeletePopupComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
