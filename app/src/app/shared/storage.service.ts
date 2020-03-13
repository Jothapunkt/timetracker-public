import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    // Attributes

    /* Caches results from storage access
     * The cache can be used to access data instantly with no promise for in-order execution
     * Values can be preloaded into the cache by using the fetch(key) method
     */
    public storageCache = {};

    // Methods

    // Gets a value from storage (async) and passes it into the callback function
    public get(key: string, callback: any, defaultValue = null) {
        Plugins.Storage.get({key}).then(data => {
            if (data && data.value) {
                this.storageCache[key] = JSON.parse(data.value);
                callback(JSON.parse(data.value));
            } else {
                this.storageCache[key] = defaultValue;
                callback(defaultValue);
            }
        });
    }

    // Writes a key-value pair to storage
    public set(key: string, value: any) {
        value = JSON.stringify(value);
        Plugins.Storage.set({
            key,
            value
        });
        this.storageCache[key] = value;
    }

    // Preloads a key-value pair into the cache for instant access
    public fetch(key: string, defaultValue = null) {
        Plugins.Storage.get({key}).then(data => {
            if (data && data.value) {
                this.storageCache[key] = JSON.parse(data.value);
            } else {
                this.storageCache[key] = defaultValue;
            }
        });
    }

    // Preloads a list of key-value pairs
    public fetchAll(keys) {
        keys.forEach(key => {
            this.fetch(key);
        });
    }

    // Gets a value from storage cache
    public instant(key: string, defaultValue = null) {
        if (typeof this.storageCache[key] !== undefined) {
            return this.storageCache[key];
        } else {
            return defaultValue;
        }
    }

    // Clears all cached values
    public clearCache() {
        this.storageCache = {};
    }
}

