import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    constructor(private http: HttpClient) {
    }

    public getRequestBuilder() {
        const builder = {
            host: null,
            port: '',
            params: [],
            path: null,
            setPath: (newPath: string) => {
                builder.path = newPath;
                return builder;
            },
            setHost: (newHost: string) => {
                builder.host = newHost;
                return builder;
            },
            setPort: (newPort: string) => {
                if (newPort.length > 0 && newPort.charAt(0) !== ':') {
                    newPort = ':' + newPort;
                }
                builder.port = newPort;
                return builder;
            },
            addParam: (paramName: string, paramVal: any) => {
                builder.params.push(paramName + '=' + paramVal.toString());
                return builder;
            },
            getUrl: () => {
                if (builder.host === null) {
                    console.warn('RequestBuilder: No host specified');
                }
                let url = builder.host + builder.port + builder.path;
                if (builder.params.length > 0) {
                    url += '?';
                    url += builder.params.join('&');
                }
                return url;
            },
            get: () => {
                return this.http.get(builder.getUrl());
            }
        };
        return builder;
    }
}
