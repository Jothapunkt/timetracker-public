import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    public logs = [];
    public filteredLogs = [];

    public ERROR = 'error';
    public WARNING = 'warning';
    public INFO = 'info';

    public validLevels = [this.ERROR, this.WARNING, this.INFO];
    public levelColors = {
        default: 'medium',
        filtered: 'light'
    };

    public defaultTag = '--';
    public filterTag = null;
    currentFilter = [];

    constructor() {
        this.levelColors[this.ERROR] = 'danger';
        this.levelColors[this.WARNING] = 'warning';
        this.levelColors[this.INFO] = 'primary';

        console.log = () => {
            this.log(Array.from(arguments).join(' '));
        };
        console.info = () => {
            this.log(Array.from(arguments).join(' '));
        };
        console.error = () => {
            this.error(Array.from(arguments).join(' '));
        };
        console.warn = () => {
            this.warn(Array.from(arguments).join(' '));
        };
    }

    public stdlog = console.log.bind(console);
    public stderror = console.error.bind(console);
    public stdwarn = console.warn.bind(console);

    public addFilter(level: string) {
        if (this.validLevels.indexOf(level) === -1) {
            this.warn('Invalid filter level: ' + level);
            return;
        }

        if (this.currentFilter.indexOf(level) === -1) {
            this.currentFilter.push(level);
        }
    }

    public removeFilter(level: string) {
        if (this.validLevels.indexOf(level) === -1) {
            this.warn('Invalid filter level: ' + level);
            return;
        }

        if (this.currentFilter.indexOf(level) !== -1) {
            this.currentFilter.splice(this.currentFilter.indexOf(level), 1);
        }
    }

    public toggleFilter(level: string) {
        if (this.validLevels.indexOf(level) === -1) {
            this.warn('Invalid filter level: ' + level);
            return;
        }

        if (this.currentFilter.indexOf(level) === -1) {
            this.addFilter(level);
        } else {
            this.removeFilter(level);
        }
    }

    public isFiltered(level: string) {
        if (this.validLevels.indexOf(level) === -1) {
            this.warn('Invalid filter level: ' + level);
            return;
        }

        return (this.currentFilter.indexOf(level) !== -1);
    }

    public log(message: any, level: string = this.INFO, tag: string = this.defaultTag, logConsole = true) {
        message = message.toString();
        if (message.trim().length === 0 && message.length !== 0) {
            message = '<<only whitespace>>';
        }
        if (message.length === 0) {
            message = '<<empty string>>';
        }

        if (this.validLevels.indexOf(level) === -1) {
            this.stderror.apply(console, ['Invalid log level: ' + level]);
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
            switch (level) {
                case(this.ERROR):
                    this.stderror.apply(console, [message]);
                    break;
                case(this.WARNING):
                    this.stdwarn.apply(console, [message]);
                    break;
                default:
                    this.stdlog.apply(console, [message]);
            }
        }

        this.getFilteredLogs();
    }

    // Shorthand function
    public error(message: any, tag: string = this.defaultTag, logConsole = true) {
        this.log(message, this.ERROR, tag, logConsole);
    }

    // Shorthand function
    public warn(message: any, tag: string = this.defaultTag, logConsole = true) {
        this.log(message, this.WARNING, tag, logConsole);
    }

    public sortLogs(order = 'latest') {
        if (order === 'latest') {
            this.logs = this.logs.sort((a, b) => {
                return a.timestamp - b.timestamp;
            });

            return this.logs;
        }

        if (order === 'oldest') {
            this.logs = this.logs.sort((a, b) => {
                return b.timestamp - a.timestamp;
            });

            return this.logs;
        }

        this.error('Unknown log sort order: "' + order + '"', 'logSort');
        this.getFilteredLogs();
        return this.logs;
    }

    /*
     * Filter logs by level.
     * Pass a list of levels that should not be included in the filtered logs.
     * Uses current filter by default, which is initialized to allow all levels
     */
    public getFilteredLogs(allow = this.currentFilter, tag: string = this.filterTag) {
        this.filteredLogs = [];

        this.logs.forEach((entry) => {
            if (allow.indexOf(entry.level) === -1 && (tag === null || tag === entry.tag)) {
                this.filteredLogs.push(entry);
            }
        });

        this.stdlog.apply(console, ['filteredLogs update: ' + this.filteredLogs.length]);
        return this.filteredLogs;
    }

    public setFilterTag(tag: string) {
        this.filterTag = tag;
        this.getFilteredLogs();
    }

    public getColor(level: string) {
        if (this.isFiltered(level)) {
            return this.levelColors.filtered;
        }
        if (typeof this.levelColors[level] !== 'undefined') {
            return this.levelColors[level];
        } else {
            return this.levelColors.default;
        }
    }

    public formatTimestamp(timestamp: number) {
        const d = new Date(timestamp);
        let hr = d.getHours().toString();
        let min = d.getMinutes().toString();
        let sec = d.getSeconds().toString();

        if (hr.length === 1) { hr = '0' + hr; }
        if (min.length === 1) { min = '0' + min; }
        if (sec.length === 1) { sec = '0' + sec; }

        return hr + ':' + min + ':' + sec;
    }
}

