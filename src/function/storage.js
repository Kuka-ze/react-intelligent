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

// import Storage from 'xx/storage.js'
// const storage1 = new Storage(24*60*60*1000); // 设置全局默认过期时间为24小时
// storage1.set('name', 'nan'); // 使用全局默认过期时间
// storage1.set('age', 18, 60*1000); // 设置独立的过期时间为1分钟

