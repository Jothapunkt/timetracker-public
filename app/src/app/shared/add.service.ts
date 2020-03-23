import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class AddService {
    date: string;
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
        console.log('Add project');
        console.log(this.globalService.currentProject);
        builder.setHost(this.globalService.apiHost)
            .setPath('add/index.php')
            .addParam('project', this.globalService.currentProject.code)
            .addParam('day', this.block.day)
            .addParam('month', this.block.month)
            .addParam('year', this.block.year)
            .addParam('description', this.block.description)
            .addParam('duration', this.block.duration)
            .get().subscribe((result: any) => {
                console.log(JSON.stringify(result));
        });
        this.reset();
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

