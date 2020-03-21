import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class AddService {
    date: any;
    constructor(private requestsService: RequestService,
                private globalService: GlobalService) {
        this.reset();
    }

    public block = {
        day: undefined,
        month: undefined,
        year: undefined,
        description: undefined,
        duration: undefined
    };

    public reset() {
        this.block.day = new Date().getDate();
        this.block.month = new Date().getMonth() + 1;
        this.block.year = new Date().getFullYear();

        this.block.description = '';
        this.block.duration = 0;

        this.date = new Date().toDateString();
    }

    public addBlock() {
        const builder = this.requestsService.getRequestBuilder();
        builder.setHost(this.globalService.apiHost)
            .setPath('add/index.php')
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
        console.log(this.date);
    }
}

