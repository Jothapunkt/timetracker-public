import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';
import {ProjectService} from './project.service';

@Injectable({
    providedIn: 'root'
})
export class EditProjectService {
    constructor(private requestsService: RequestService,
                private globalService: GlobalService,
                private projectService: ProjectService) {}

    public project = {
        code: undefined,
        title: undefined,
        invoiceTemplate: undefined,
        hoursTemplate: undefined,
        sender: undefined,
        recipient: undefined,
        rate: undefined
    };

    public editProject() {
        const builder = this.requestsService.getRequestBuilder();
        builder.setHost(this.globalService.apiHost)
            .setPath('editProject/index.php')
            .addParam('code', this.project.code)
            .addParam('title', this.project.title)
            .addParam('invoiceTemplate', this.project.invoiceTemplate)
            .addParam('hoursTemplate', this.project.hoursTemplate)
            .addParam('sender', this.project.sender)
            .addParam('recipient', this.project.recipient)
            .addParam('rate', this.project.rate)
            .get().subscribe((result: any) => {
                this.projectService.refreshProjects();
                console.log(JSON.stringify(result));
        });
    }

    public reset() {
        this.project = {
            code: undefined,
            title: undefined,
            invoiceTemplate: undefined,
            hoursTemplate: undefined,
            sender: undefined,
            recipient: undefined,
            rate: undefined
        };
    }

    public setProject(project) {
        this.project.code = project.code;
        this.project.title = project.title;
        this.project.invoiceTemplate = project.invoiceTemplate;
        this.project.hoursTemplate = project.hoursTemplate;
        this.project.sender = project.sender;
        this.project.recipient = project.recipient;
        this.project.rate = project.rate;
    }
}

