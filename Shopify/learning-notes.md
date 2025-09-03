## 1-What is "State" in Angular?
In Angular, **state** simply means the data your app needs to remember at a given time.

### Examples of state:
- Logged-in user info
- Current page of a table
- Items in a shopping cart
- Form inputs before saving

### Where state can live:
- **Locally**: inside one component
- **Globally**: shared across multiple components

## 2-Why Do We Need "State Management"?

Without a clear way to manage state:
- Data becomes hard to share between components
- It’s easy to have out-of-sync UIs
- Debugging is painful

A good state management pattern ensures:
- Data is predictable
- Changes are easy to track
- Code is easier to maintain

## 3-Local State (inside a component)
* Store data in component class properties.
* Use @Input() to pass state down to children.
* Use @Output() or Angular Signals to send updates back up.
Example:
```ts
@Component({
  selector: 'app-counter',
  template: `
    <p>{{ count }}</p>
    <button (click)="count++">Increment</button>
  `
})
export class CounterComponent {
  count = 0; // local state
}
```

## 4-Shared State (between components)
* Use services to store state in memory.
* Inject the service into any component that needs the state.
Example:
@Injectable({ providedIn: 'root' })
export class CartService {
  items: string[] = [];
  addItem(item: string) { this.items.push(item); }
}
```ts
@Component({ /* ... */ })
export class ProductComponent {
  constructor(private cart: CartService) {}
  addToCart(product: string) { this.cart.addItem(product); }
}

@Component({ /* ... */ })
export class CartComponent {
  constructor(public cart: CartService) {}
}
```
Both components share the same CartService instance.

## 5-Global / Complex State

When the app grows and state is large & complex:

* Use state management libraries like:
    * NgRx (Redux pattern)
    * NGXS
    * Akita
    * Angular Signals-based stores

These help:

* Centralize all app state in one place.
* Use a single source of truth.
* Debug with time travel (undo/redo).
* Handle async updates in a structured way.

## 6-Modern Angular — Signals for State

Since Angular 16, Signals provide fine-grained reactivity for state.

Example:

```ts
@Injectable({ providedIn: 'root' })
export class CounterStore {
  count = signal(0);
  double = computed(() => this.count() * 2);
  increment() { this.count.update(c => c + 1); }
}

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ store.count() }}</p>
    <p>Double: {{ store.double() }}</p>
    <button (click)="store.increment()">Increment</button>
  `
})
export class CounterComponent {
  constructor(public store: CounterStore) {}
}
```

## 7-Summary Table

| Approach             | Best for                        | Pros                               | Cons                           |
|---------------------|---------------------------------|-----------------------------------|--------------------------------|
| Local State          | Small, self-contained components | Simple, no extra setup             | Hard to share                  |
| Shared Service       | Multiple components need state  | Easy to set up, centralized        | No built-in undo/history       |
| NgRx / NGXS / Akita  | Large apps with complex state   | Predictable, debug tools, scalable | More boilerplate, learning curve |
| Signals Store        | Modern, fine-grained reactivity | Simple syntax, efficient updates   | Newer API (still evolving)     |


## 8-titles what I learned
three handshake
http
methods GET(bodyless) get data/ POST(body) post data insert / PUT (body) update / PATCH / DELETE (bodyless)
header: any data AMA more use for server configuration or permissions 
path
protocol version 1.1 & 2.0? more open connection 6 to infinity 
body : any data that backend want 

## 9-Learning TanStack Query
- In Angular, you usually use HttpClient + RxJS to fetch data, but you have to manage:
* Loading states (isLoading)
* Errors
* Refetching
* Caching
* Background updates
TanStack Query automates all of this. It’s like a smart assistant for API calls.

## 10-Setup QueryClient

Think of QueryClient as the brain that manages all your queries.  
(A query is just a request to fetch some data from a server, like an API call.)  

But in **TanStack Query**, a query is much more powerful than a normal HttpClient call because it comes with built-in features.  

A query = a data-fetching request.  

You need to provide it at the **root of your Angular app**.
