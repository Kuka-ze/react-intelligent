export default class Storage {
    constructor(expiryTime) {
        this.expiryTime = expiryTime;
    }
    set(key, value, expiryTime) {
        let obj = {
            data: value,
            expiryTime: Date.now()+(expiryTime || this.expiryTime)
        };
        localStorage.setItem(key, JSON.stringify(obj));
    }
    get(key) {
        let item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        item = JSON.parse(item);
        let nowTime = Date.now();
        if (item.expiryTime && nowTime > item.expiryTime) {
            console.log('已过期');
            this.remove(key);
            return null;
        } else {
            return item.data;
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}
