# React Custom Hooks Collection

A collection of useful custom React hooks for common development patterns. This project provides TypeScript-ready hooks that can be easily integrated into any React application.

## 🚀 Available Hooks

### 1. `useCounter` - Counter State Management

A simple hook for managing counter state with increment, decrement, and reset functionality.

```typescript
import { useCounter } from './useCounter';

function CounterComponent() {
  const { counter, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => increment(5)}>+5</button>
      <button onClick={() => decrement()}>-1</button>
      <button onClick={() => decrement(3)}>-3</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

**API:**
- `counter: number` - Current counter value
- `increment(factor?: number)` - Increment by factor (default: 1)
- `decrement(factor?: number)` - Decrement by factor (default: 1)
- `reset()` - Reset to initial value

### 2. `useForm` - Form State Management

A generic form hook for managing form state with automatic input change handling.

```typescript
import { useForm } from './useForm';

interface LoginForm {
  email: string;
  password: string;
}

function LoginComponent() {
  const { formState, onInputChange, onResetForm } = useForm<LoginForm>({
    email: '',
    password: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formState);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={onInputChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={onInputChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      <button type="button" onClick={onResetForm}>Reset</button>
    </form>
  );
}
```

**API:**
- `formState: T` - Current form state
- `onInputChange: (event: ChangeEvent<HTMLInputElement>) => void` - Input change handler
- `onResetForm: () => void` - Reset form to initial values

### 3. `useFetch` - Data Fetching with Cache

A hook for fetching data from APIs with built-in caching and error handling.

```typescript
import { useFetch } from './useFetch';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const { data, loading, hasError, error } = useFetch<User>(
    `https://api.example.com/users/${userId}`
  );
  
  if (loading) return <div>Loading...</div>;
  if (hasError) return <div>Error: {error}</div>;
  if (!data) return <div>No data found</div>;
  
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  );
}
```

**API:**
- `data: T | null` - Fetched data
- `loading: boolean` - Loading state
- `hasError: boolean` - Error state
- `error: string | null` - Error message

**Features:**
- Automatic caching using URL as key
- Memory leak prevention with cleanup
- Error handling with descriptive messages

### 4. `useFetchRickAndMorty` - TanStack Query Integration

A specialized hook using TanStack Query for robust data fetching with advanced caching and retry logic.

```typescript
import { useFetchRickAndMorty } from './useTanStack';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
}

function CharacterList() {
  const { data, isLoading, haveError, error } = useFetchRickAndMorty<Character[]>({
    url: 'https://rickandmortyapi.com/api/character',
    queryKey: ['characters'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3
  });
  
  if (isLoading) return <div>Loading characters...</div>;
  if (haveError) return <div>Error: {error?.message}</div>;
  
  return (
    <div>
      {data?.map(character => (
        <div key={character.id}>
          <h3>{character.name}</h3>
          <p>{character.species} - {character.status}</p>
        </div>
      ))}
    </div>
  );
}
```

**API:**
- `data: T | null` - Query result data
- `isLoading: boolean` - Loading state
- `haveError: boolean` - Error state
- `error: Error | null` - Error object

**Configuration Options:**
- `url: string` - API endpoint
- `queryKey?: unknown[]` - Custom query key
- `staleTime?: number` - Data freshness time (default: 5 minutes)
- `gcTime?: number` - Garbage collection time (default: 30 minutes)
- `retry?: number | boolean` - Retry attempts (default: 3)
- `retryDelay?: number` - Delay between retries (default: 1000ms)

## 📦 Installation

1. Clone this repository:
```bash
git clone https://github.com/Crisfon6/react-hooks.git
cd react-hooks
```

2. Install dependencies (if using TanStack Query):
```bash
npm install @tanstack/react-query
```

3. Copy the hooks you need to your project or import them directly.

## 🛠️ Requirements

- React 16.8+ (for hooks support)
- TypeScript (recommended)
- For `useFetchRickAndMorty`: @tanstack/react-query

## 📝 Usage Examples

### Combining Multiple Hooks

```typescript
function AdvancedForm() {
  const { formState, onInputChange, onResetForm } = useForm({
    name: '',
    age: ''
  });
  
  const { counter, increment } = useCounter(0);
  
  const { data, loading } = useFetch(`/api/users/${counter}`);
  
  return (
    <div>
      <form>
        <input
          name="name"
          value={formState.name}
          onChange={onInputChange}
        />
        <button onClick={() => increment()}>
          Next User ({counter})
        </button>
      </form>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>Current user: {data?.name}</p>
      )}
    </div>
  );
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your custom hook
4. Update the README with documentation
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues

If you find any bugs or have feature requests, please open an issue on GitHub.

---

**Happy coding! 🎉**
