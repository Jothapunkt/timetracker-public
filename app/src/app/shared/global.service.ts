import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public token = 'test_token22';
    public apiHost = 'http://jothapunkt.de/zeiterfassung/';
    public port = '';
    public blocks = [];
}

