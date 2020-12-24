class Subscription {
    listeners: Function[] = [];

    subscribe = (subscribeFn: Function) => {
        this.listeners.push(subscribeFn);
    }

    unsubscribe = (subscribeFn: Function) => {
        this.listeners = this.listeners.filter((listener) => listener !== subscribeFn);
    }

    notify = () => {
        this.listeners.forEach(listener => listener());
    }
}

export default Subscription;
