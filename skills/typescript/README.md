# TypeScript Conventions

## Strict Configuration

Always use strict TypeScript settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## Type Guidelines

### Prefer Explicit Types
```typescript
// Good
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// Avoid
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

### Use `unknown` for Type Assertions
```typescript
// Good
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
}

// Avoid
function processData(data: any) {
  return data.toUpperCase(); // Could fail at runtime
}
```

### Discriminated Unions
```typescript
type Result<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleResult<T>(result: Result<T>) {
  if (result.status === 'success') {
    console.log(result.data);
  } else {
    console.error(result.error);
  }
}
```

## Error Handling

```typescript
type Result<T, E = Error> = 
  | { ok: true; value: T }
  | { ok: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await db.findUser(id);
    if (!user) {
      return { ok: false, error: new Error('User not found') };
    }
    return { ok: true, value: user };
  } catch (error) {
    return { ok: false, error };
  }
}
```

## Functional Patterns

- Prefer pure functions
- Avoid mutations
- Use `readonly` for immutable data
- Use `ReadonlyArray<T>` instead of `T[]` for read-only arrays

```typescript
// Good
function processItems(items: ReadonlyArray<string>): string[] {
  return items.map(item => item.toUpperCase());
}

// Avoid
function processItems(items: string[]): void {
  for (let i = 0; i < items.length; i++) {
    items[i] = items[i].toUpperCase();
  }
}
```
