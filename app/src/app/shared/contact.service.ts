import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    public code = '';
    constructor(private requestsService: RequestService,
                private globalService: GlobalService,
                private storageService: StorageService) {
        this.reset();
    }

    public block = {
        fullname: undefined,
        phone: undefined,
        mail: undefined,
        address: undefined
    };

    public reset() {
        this.block.fullname = '';
        this.block.phone = '';
        this.block.mail = '';
        this.block.address = '';
        this.code = '';
    }

    public addContact(callback: () => void = () => {}) {
        const builder = this.requestsService.getRequestBuilder();
        builder.setHost(this.globalService.apiHost)
            .setPath('createContact/index.php')
            .addParam('fullname', this.block.fullname)
            .addParam('phone', this.block.phone)
            .addParam('mail', this.block.mail)
            .addParam('address', this.block.address)
            .get().subscribe((result: any) => {
                if (result.success) {
                    this.addContactCode(result.result);
                    callback();
                };
        });
        this.reset();
    }

    public refreshContacts() {
        this.globalService.contacts = [];
        console.log(this.globalService.contactCodes);
        this.globalService.contactCodes.forEach((contactCode) => {
            const builder = this.requestsService.getRequestBuilder();

            builder.setHost(this.globalService.apiHost)
                .setPath('getProject/')
                .addParam('code', contactCode)
                .get().subscribe((result: any) => {
                if (result.success) {
                    console.log(result.result);
                    if (result.result.length === 0) {
                        this.removeContactCode(contactCode);
                    } else {
                        result.result.forEach((p) => {
                            if (!this.contactListed(p)) {
                                this.globalService.contacts.push(p);
                            }
                        });
                    }
                }
            });
        });
    }

    public addContactCode(code: string) {
        if (this.globalService.contactCodes.indexOf(code) === -1) {
            this.globalService.contactCodes.push(code);
            this.storageService.set('contactCodes', this.globalService.contactCodes);
            this.refreshContacts();
        }
    }

    public removeContactCode(code: string) {
        while (this.globalService.contactCodes.indexOf(code) !== -1) {
            this.globalService.contactCodes.splice(this.globalService.contactCodes.indexOf(code), 1);
            this.storageService.set('projectCodes', this.globalService.contactCodes);
            this.refreshContacts();
        }
    }

    public contactListed(contact: any) {
        let listed = false;
        this.globalService.contacts.forEach((c) => {
            if (c.code === contact.code) {
                listed = true;
            }
        });

        return listed;
    }

    public importContact(code: string) {
        this.addContactCode(code);
        this.reset();
        // May be expanded
    }
}

