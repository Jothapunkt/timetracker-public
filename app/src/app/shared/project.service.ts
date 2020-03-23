import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    public code = '';
    constructor(private requestsService: RequestService,
                private globalService: GlobalService,
                private storageService: StorageService) {
        this.reset();
    }

    public block = {
        rate: undefined,
        invoiceTemplate: undefined,
        hoursTemplate: undefined,
        title: undefined
    };

    public reset() {
        this.block.rate = 10;
        this.block.invoiceTemplate = 'invoice';
        this.block.hoursTemplate = 'hours';
        this.block.title = '';
        this.code = '';
    }

    public addProject(callback: () => void = () => {}) {
        const builder = this.requestsService.getRequestBuilder();
        builder.setHost(this.globalService.apiHost)
            .setPath('createProject/index.php')
            .addParam('rate', this.block.rate)
            .addParam('invoice_template', this.block.invoiceTemplate)
            .addParam('hours_template', this.block.hoursTemplate)
            .addParam('title', this.block.title)
            .get().subscribe((result: any) => {
                if (result.success) {
                    this.addProjectCode(result.result);
                    callback();
                };
        });
        this.reset();
    }

    public refreshProjects() {
        this.globalService.projects = [];
        console.log(this.globalService.projectCodes);
        this.globalService.projectCodes.forEach((projectCode) => {
            const builder = this.requestsService.getRequestBuilder();

            builder.setHost(this.globalService.apiHost)
                .setPath('getProject/')
                .addParam('code', projectCode)
                .get().subscribe((result: any) => {
                if (result.success) {
                    console.log(result.result);
                    result.result.forEach((p) => {
                        if (!this.projectListed(p)) {
                            this.globalService.projects.push(p);
                        }
                    });
                }
            });
        });
    }

    public addProjectCode(code: string) {
        if (this.globalService.projectCodes.indexOf(code) === -1) {
            this.globalService.projectCodes.push(code);
            this.storageService.set('projectCodes', this.globalService.projectCodes);
            this.refreshProjects();
        }
    }

    public removeProjectCode(code: string) {
        while (this.globalService.projectCodes.indexOf(code) !== -1) {
            this.globalService.projectCodes.splice(this.globalService.projectCodes.indexOf(code), 1);
            this.storageService.set('projectCodes', this.globalService.projectCodes);
            this.refreshProjects();
        }
    }

    public projectListed(project: any) {
        let listed = false;
        this.globalService.projects.forEach((p) => {
            if (p.code === project.code) {
                listed = true;
            }
        });

        return listed;
    }

    public importProject(code: string) {
        this.addProjectCode(code);
        this.reset();
        // May be expanded
    }
}

