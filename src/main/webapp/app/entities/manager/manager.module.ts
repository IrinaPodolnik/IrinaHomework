import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IrinaHomeworkSharedModule } from 'app/shared';
import {
    ManagerComponent,
    ManagerDetailComponent,
    ManagerUpdateComponent,
    ManagerDeletePopupComponent,
    ManagerDeleteDialogComponent,
    managerRoute,
    managerPopupRoute
} from './';
import {ManagerAssignEmployeeComponent} from "app/entities/manager/manager-assign-employee.component";

const ENTITY_STATES = [...managerRoute, ...managerPopupRoute];

@NgModule({
    imports: [IrinaHomeworkSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ManagerComponent,
        ManagerDetailComponent,
        ManagerUpdateComponent,
        ManagerDeleteDialogComponent,
        ManagerDeletePopupComponent,
        ManagerAssignEmployeeComponent
    ],
    entryComponents: [ManagerComponent, ManagerUpdateComponent, ManagerDeleteDialogComponent, ManagerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IrinaHomeworkManagerModule {}
