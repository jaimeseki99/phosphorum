import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserPage } from '../model/model.interfaces';
import { API_URL } from 'src/environment/environment';

@Injectable()
export class UserAjaxService {

    sUrl: string = API_URL + "/user";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IUser> {
        return this.oHttpClient.get<IUser>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IUserPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IUserPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oUser: IUser): Observable<IUser> {
        return this.oHttpClient.post<IUser>(this.sUrl, oUser);
    }

    updateOne(oUser: IUser): Observable<IUser> {
        return this.oHttpClient.put<IUser>(this.sUrl, oUser);
    }

}