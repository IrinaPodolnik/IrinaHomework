import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReport } from 'app/shared/model/report.model';

type EntityResponseType = HttpResponse<IReport>;
type EntityArrayResponseType = HttpResponse<IReport[]>;

@Injectable({ providedIn: 'root' })
export class ReportService {
    private resourceUrl = SERVER_API_URL + 'api/reports';

    constructor(private http: HttpClient) {}

    create(report: IReport): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(report);
        return this.http
            .post<IReport>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(report: IReport): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(report);
        return this.http
            .put<IReport>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReport[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(report: IReport): IReport {
        const copy: IReport = Object.assign({}, report, {
            reportDate: report.reportDate != null && report.reportDate.isValid() ? report.reportDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.reportDate = res.body.reportDate != null ? moment(res.body.reportDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((report: IReport) => {
            report.reportDate = report.reportDate != null ? moment(report.reportDate) : null;
        });
        return res;
    }
}
