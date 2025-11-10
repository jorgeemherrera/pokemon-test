# 🧩 Pokémon App – Technical Interview Exercise

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-lightgrey)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

---

## 📖 Overview
A **Pokédex-style web app** built for the React technical interview challenge.  
Includes authentication, Pokémon listing, sorting, search, and detailed information views.

---

## ⚙️ Tech Stack
| Layer | Technology |
|--------|-------------|
| **Frontend** | React + TypeScript + Vite + Node 22|
| **Backend** | Node.js + Express |
| **API Source** | [PokeAPI](https://pokeapi.co/) |
| **State Management** | React Context API |
| **Styles** | SCSS + Responsive Layout |

---

## 🔐 Features
✅ **Login screen** with validation (`admin / admin`)  
✅ **Protected routes** using `sessionStorage`  
✅ **Pokémon list** with search, pagination & sorting  
✅ **Detail view** with abilities, moves & forms  
✅ **Responsive UI** following [Figma Design](https://www.figma.com/design/uMAeOKKaXf6yW1lIU72qJr/Pok%C3%A9dex--Community-?m=auto)

---
## 🤖 GenAI Task
## Prompt: 

Help me create a table-type component for managing tasks.
It should implement CRUD locally (without a database), using only internal state.
Tasks must contain: title, description, status, due date, and assigned user in React TypeScript.

## The component should:

Display tasks in a table.
Allow adding, editing, and deleting records.
Validate required fields.
Handle task statuses (e.g., pending, in progress, completed).

## Deliverables:

Complete component code.
Forms or inputs as needed.
Storage using local state only.

## Folder Structure
src/
│
├─ components/
│   ├─ Task/
│   │   ├─ TaskTable/
│   │   │   ├─ TaskTable.tsx
│   │   │   ├─ TaskTable.css
│   │   ├─ TaskRow/
│   │   │   ├─ TaskRow.tsx
│   │   │   ├─ TaskRow.css
│   │   ├─ TaskStatusChip/
│   │   │   ├─ TaskStatusChip.tsx
│   │   │   ├─ TaskStatusChip.css
│   │   ├─ TaskForm/
│   │   │   ├─ TaskForm.tsx
│   │   │   ├─ TaskForm.css
│
├─ types/
│   ├─ task.ts
│
└─ App.tsx

## Code
Table component

```bash

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "pending",
    dateLimit: "",
    username: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const clearForm = () => {
    setForm({
      title: "",
      description: "",
      status: "pending",
      dateLimit: "",
      username: "",
    });
    setEditingId(null);
    setError("");
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Title required";
    if (!form.description.trim()) return "Description required";
    if (!form.dateLimit) return "Date required";
    if (!form.username.trim()) return "Username required";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    if (validation) {
      setError(validation);
      return;
    }

    if (editingId !== null) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...form } : t))
      );
    } else {
      setTasks((prev) => [...prev, { id: Date.now(), ...form }]);
    }

    clearForm();
  };

  const handleEdit = (task: Task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      dateLimit: task.dateLimit,
      username: task.username,
    });
    setEditingId(task.id);
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="task-container">
      <h2 className="task-title">Task Manager</h2>
      <TaskForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onCancel={clearForm}
        editing={editingId !== null}
        error={error}
      />
      <div className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date limit</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No tasks recorded
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```
TableStatusChip component

```bash
const TaskStatusChip: React.FC<TaskStatusChipProps> = ({ status, className = "", title }) => {
  const statusClass = status.replace(" ", "-");

  return (
    <span
      className={`status-chip ${statusClass} ${className}`.trim()}
      title={title ?? `Status: ${status}`}
      aria-label={`status-${statusClass}`}
    >
      {status}
    </span>
  );
};
```

TaskRow component

```bash
const TaskRow: React.FC<TaskRowProps> = ({ task, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.username}</td>
      <td>{task.description}</td>
      <td>
        <TaskStatusChip status={task.status} />
      </td>
      <td>{task.dateLimit}</td>
      <td className="task-actions">
        <button className="edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
```

TaskForm component
```bash
const TaskForm: React.FC<TaskFormProps> = ({
  form,
  setForm,
  onSubmit,
  onCancel,
  editing,
  error,
}) => {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Assigned user"
        value={form.username}
        onChange={(e) => setForm({ ...form, usuario: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={2}
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
      >
        <option value="pending">Pending</option>
        <option value="in progress">In progress</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="date"
        value={form.dateLimit}
        onChange={(e) => setForm({ ...form, dateLimit: e.target.value })}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">
        {editing ? "Save changes" : "Add task"}
      </button>

      {editing && (
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};
```
TaskView component

```bash
const TaskView: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Task Panel</h1>

      <TaskTable />
    </div>
  );
};
```

## Improvements Implemented in This Project

Throughout the development of this project, I implemented several improvements to keep the code organized, reusable, and easy to maintain.

## Componentization

The logic was split into components such as TaskForm, TaskRow, and TaskStatusChip, improving code clarity and avoiding duplication.

## Custom Styles

Created component-specific CSS files to maintain a consistent and visually appealing interface.

## Centralized Types

Moved the Task, TaskStatus, and related prop types to types/task.ts, ensuring consistency and scalability with TypeScript.

## Folder Organization

Reorganized the project structure to separate components, views, and types, making it easier to scale and maintain.


---

### 🎨 Frontend Prompts

<details>
<summary>React + UI + Logic</summary>

**Prompt 1:**  
> "How to manage a relative maximum of stats per Pokémon in my Bar component?"
Changes: None

**Prompt 2:**  
> "I need a logic that helps me search for products with scroll, but I think I should move it to a custom hook. What do you recommend?" 
Changes: 
1️⃣ Added isFetchingRef (useRef) to prevent duplicate fetch calls.
2️⃣ Combined conditions (isFetchingRef, isLoading, hasMore) for safer control.
3️⃣ Improved scroll detection using pageHeight - scrollPosition <= offset.
4️⃣ Added configurable offset parameter (default: 200).
5️⃣ Reset isFetchingRef when loading completes (!isLoading).
6️⃣ Used { passive: true } in the event listener for better performance.
7️⃣ Ensured proper cleanup and ref reset on mount/unmount.

**Prompt 3:**  
> "For my case, what is the quickest way to protect routes in React Router using a session to check if the user is logged in?"

Changes: 
1️⃣ Added isLoggedIn state based on sessionStorage to track user authentication.
2️⃣ Protected / (Home) route: redirects to /login if not authenticated.
3️⃣ Protected /pokemon/:id (Detail) route: redirects to /login if not authenticated.
4️⃣ Conditional /login route: redirects to / if already logged in; otherwise renders Login and updates isLoggedIn on login.
5️⃣ Handled route protection directly in element={...} without creating a separate PrivateRoute component.
6️⃣ Wrapped all routes with QueryClientProvider for React Query integration.

**Prompt 4:**  
> "How can I use a mixin to set the background and text color based on my Pokémon's category? This way, I avoid repeating classes and colors"

Changes:
1️⃣ Defined a color palette for Pokémon types and general UI ($colors map) for consistency.
2️⃣ Created type-text($type) mixin to dynamically generate text color classes like .fire-text, .water-text, etc.
3️⃣ Created type-style($type) mixin to generate both background and text color classes for each type.
4️⃣ Created type-style-light($type) mixin to generate lighter variants of background and text color using lighten($color, 20%).
5️⃣ Automatically generated all classes with @each $type, $color in $colors { @include type-style($type); @include type-style-light($type); }.
6️⃣ Separated normal and light variants for flexible styling in UI components.
7️⃣ Centralized color logic, making it easy to update or add new types without touching multiple CSS rules.

**Prompt 5:**  
> "To limit requests in a search field, I’m using useQuery. But for better optimization, do you recommend using a debounce?"

Changes:
1️⃣ Added useDebounce to reduce unnecessary API calls during search.
2️⃣ Added sort as a dependency to refetch when it changes.
3️⃣ Configured staleTime, retry, and refetchOnWindowFocus for better performance.

</details>

---

### 🎨 Backend Prompts

<details>
<summary>Node.js + Express</summary>

**Prompt 1:**  
> "What is the proper configuration for my tsconfig.json in Node.js + Express?"
Changes: None

**Prompt 2:**  
> "If the PokéAPI returns flat results and I need the details for each Pokémon, do I need to perform a nested fetch to get the results? How could I do it?." 
Changes:
1️⃣ Added nested Promise.all fetch to get full Pokémon details for each result.
2️⃣ Implemented a cache (allPokemonsCache) to avoid fetching all Pokémon repeatedly when sorting by name.

**Prompt 3:**  
> "How can I fetch all Pokémon first and then sort them alphabetically before paginating, using cached results to avoid fetching everything repeatedly, without having the alphabetical order applied per page and messing up the results?"

Changes: 
1️⃣ Fetched all Pokémon (limit=10000) once and cached them in allPokemonsCache.
2️⃣ Sorted cached Pokémon alphabetically using localeCompare before paginating.
3️⃣ Calculated next and previous URLs manually for paginated results after alphabetical sorting.
4️⃣ Applied nested Promise.all fetch to get full details of only the Pokémon in the current page.

</details>

---

## 🚀 Getting Started
```bash
nvm use 22
npm install
npm run dev
```

### 🧱 Backend
```bash
npm install
npm run dev
```

