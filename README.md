# TypeScript Event Emitter

A simple and type-safe event emitter written in TypeScript. This example demonstrates how to use generics to build a robust event-driven system.

## Features

- Type-safe event names and data.
- Subscribe, unsubscribe, and emit events.
- Easy to extend with more functionality.

## Usage

```typescript
import { EventEmitter } from './EventEmitter';

const emitter = new EventEmitter<'userSignup' | 'userUpdate'>();

// Subscribe to events
emitter.on('userSignup', (data) => console.log(`User signed up: ${data.name}, Age: ${data.age}`));
emitter.emit('userSignup', { name: 'Alice', age: 30 });
```