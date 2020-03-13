import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public global = {};

    public clear() {
        this.global = {};
    }
}

