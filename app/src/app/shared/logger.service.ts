import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    constructor() {
    }

    public logs = [];

    public ERROR = 'error';
    public WARNING = 'warning';
    public INFO = 'info';

    public validLevels = [this.ERROR, this.WARNING, this.INFO];

    public defaultTag = '--';

    public log(message: string, level: string = this.INFO, tag: string = this.defaultTag, logConsole = true) {
        if (this.validLevels.indexOf(level) === -1) {
            console.error('Invalid log level: ' + level);
            return;
        }

        const entry = {
            message,
            level,
            tag,
            timestamp: new Date().getTime()
        };

        this.logs.push(entry);

        if (logConsole) {
            switch(level) {
                case(this.ERROR):
                    console.error(message);
                    break;
                case(this.WARNING):
                    console.warn(message);
                    break;
                default:
                    console.log(message);
            }
        }
    }

    public error(message: string, tag: string = this.defaultTag, logConsole = true) {
        this.log(message, this.ERROR, tag, logConsole);
    }

    public warn(message: string, tag: string = this.defaultTag, logConsole = true) {
        this.log(message, this.WARNING, tag, logConsole);
    }
}

