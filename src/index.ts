// EventEmitter.ts - Custom EventEmitter with TypeScript Generics

type EventCallback<T = any> = (data: T) => void;

class EventEmitter<T extends string = string> {
    private events: { [key in T]?: EventCallback[] } = {};

    // Subscribe to an event
    on<K extends T>(event: K, callback: EventCallback): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event]!.push(callback);
    }

    // Unsubscribe from an event
    off<K extends T>(event: K, callback: EventCallback): void {
        if (!this.events[event]) return;
        this.events[event] = this.events[event]!.filter(cb => cb !== callback);
    }

    // Emit an event
    emit<K extends T>(event: K, data: Parameters<EventCallback>[0]): void {
        if (!this.events[event]) return;
        this.events[event]!.forEach(callback => callback(data));
    }
}

// Example Usage

interface UserEventData {
    name: string;
    age: number;
}

const emitter = new EventEmitter<'userSignup' | 'userUpdate'>();

// Subscriber 1
emitter.on('userSignup', (data: UserEventData) => {
    console.log(`User signed up: ${data.name}, Age: ${data.age}`);
});

// Subscriber 2
emitter.on('userUpdate', (data: UserEventData) => {
    console.log(`User updated: ${data.name}, Age: ${data.age}`);
});

// Emit events
emitter.emit('userSignup', { name: 'Alice', age: 30 });
emitter.emit('userUpdate', { name: 'Alice', age: 31 });

// Unsubscribe
const userSignupHandler: EventCallback = (data) => {
    console.log(`User signed up: ${data.name}, Age: ${data.age}`);
};

emitter.off('userSignup', userSignupHandler);
emitter.emit('userSignup', { name: 'Bob', age: 25 }); // This will not trigger any action
