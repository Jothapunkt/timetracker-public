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
        this.storageService.get('contactCodes', (contactCodes) => {
            this.globalService.contactCodes = contactCodes;
            this.refreshContacts();
        }, ['mustermann1', 'mustermann2']);
        this.reset();
    }

    public contact = {
        fullname: undefined,
        phone: undefined,
        mail: undefined,
        address: undefined
    };

    public reset() {
        this.contact.fullname = '';
        this.contact.phone = '';
        this.contact.mail = '';
        this.contact.address = '';
        this.code = '';
    }

    public addContact(callback: () => void = () => {
    }) {
        const builder = this.requestsService.getRequestBuilder();
        builder.setHost(this.globalService.apiHost)
            .setPath('createContact/index.php')
            .addParam('fullname', this.contact.fullname)
            .addParam('phone', this.contact.phone)
            .addParam('mail', this.contact.mail)
            .addParam('address', this.contact.address)
            .get().subscribe((result: any) => {
            if (result.success) {
                this.addContactCode(result.result);
                callback();
            }
        });
        this.reset();
    }

    public refreshContacts() {
        this.globalService.contacts = [];
        console.log(this.globalService.contactCodes);
        this.globalService.contactCodes.forEach((contactCode) => {
            const builder = this.requestsService.getRequestBuilder();

            builder.setHost(this.globalService.apiHost)
                .setPath('getContact/')
                .addParam('code', contactCode)
                .get().subscribe((result: any) => {
                if (result.success) {
                    console.log(result.result);
                    if (result.result.length === 0) {
                        this.removeContactCode(contactCode);
                    } else {
                        if (!this.contactListed(result.result)) {
                            this.globalService.contacts.push(result.result);
                        }
                    }
                }
            });
        });
    }

    public async loadContact(code: string) {
        return new Promise(resolve => {
            this.requestsService.getRequestBuilder()
                .setHost(this.globalService.apiHost)
                .setPath('getContact/')
                .addParam('code', code)
                .get().subscribe((result: any) => {
                if (result.success) {
                    resolve(result.result);
                } else {
                    resolve(null);
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
            this.storageService.set('contactCodes', this.globalService.contactCodes);
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

