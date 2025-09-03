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