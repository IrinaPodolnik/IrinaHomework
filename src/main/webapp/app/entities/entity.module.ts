import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IrinaHomeworkReportModule } from './report/report.module';
import { IrinaHomeworkTaskModule } from './task/task.module';
import { IrinaHomeworkEmployeeModule } from './employee/employee.module';
import { IrinaHomeworkManagerModule } from './manager/manager.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        IrinaHomeworkReportModule,
        IrinaHomeworkTaskModule,
        IrinaHomeworkEmployeeModule,
        IrinaHomeworkManagerModule,

        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IrinaHomeworkEntityModule {}
