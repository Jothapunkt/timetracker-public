import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {StorageService} from './storage.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    constructor(public translateService: TranslateService,
                private storageService: StorageService) {
        this.getLanguage();
    }

    public getLanguage() {
        this.storageService.get('language', value => {
            this.translateService.use(value);
        }, 'de');
    }

    public setLanguage(lang) {
        this.storageService.set('language', lang);
        this.translateService.use(lang);
    }

    public translate(key: string) {
        try {
            return this.translateService.instant(key);
        } catch (e) {
            console.error('Exception translating key "' + key + '" : ' + e.toString());
            return key;
        }
    }

    public parseDateString(dateString) {
        return (new Date(dateString)).getTime();
    }

    public dateFormatString() {
        const dateString = this.translate('LOCALIZATION.DATE_FORMAT');
        return dateString.replace('day', 'DD').replace('month', 'MM').replace('year', 'YYYY');
    }
    public timestampToLocalizedDate(timestamp) {
        const date = new Date(timestamp);
        const dateString = this.translate('LOCALIZATION.DATE_FORMAT');

        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();

        if (day.length < 2) {
            day = '0' + day;
        }
        if (month.length < 2) {
            month = '0' + month;
        }

        return dateString
            .replace('day', day)
            .replace('month', month)
            .replace('year', year);
    }
}

