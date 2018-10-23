import { NgModule } from '@angular/core';

import { IrinaHomeworkSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [IrinaHomeworkSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [IrinaHomeworkSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class IrinaHomeworkSharedCommonModule {}
