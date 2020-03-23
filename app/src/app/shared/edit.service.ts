import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class EditService {
    date = '';
    constructor(private requestsService: RequestService,
                private globalService: GlobalService) {}

    public block = {
        day: undefined,
        month: undefined,
        year: undefined,
        description: undefined,
        duration: undefined,
        id: undefined
    };

    public editBlock() {
        const builder = this.requestsService.getRequestBuilder();
        builder.setHost(this.globalService.apiHost)
            .setPath('edit/index.php')
            .addParam('id', this.block.id)
            .addParam('day', this.block.day)
            .addParam('month', this.block.month)
            .addParam('year', this.block.year)
            .addParam('description', this.block.description)
            .addParam('duration', this.block.duration)
            .get().subscribe((result: any) => {
                console.log(JSON.stringify(result));
        });
    }

    public applyDate() {
        const d = new Date(this.date);
        this.block.day = d.getDate();
        this.block.month = d.getMonth() + 1;
        this.block.year = d.getFullYear();
    }

    public initDate() {
        this.date = new Date(this.block.year, this.block.month - 1, this.block.day).toDateString();
    }
}

