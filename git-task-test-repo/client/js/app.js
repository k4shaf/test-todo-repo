// client/js/app.js
// Minimal client app to list and add tasks

async function renderTasks() {
  const tasks = await window.__DEMO_API.fetchTasks();
  const container = document.getElementById('tasks');
  container.innerHTML = '';
  tasks.forEach(t => {
    const el = document.createElement('div');
    el.className = 'task';
    el.textContent = `${t.id}: ${t.title} - ${t.description || ''}`;
    container.appendChild(el);
  });
}

document.getElementById('addTaskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  if (!title) {
    // TODO: show nice UI validation for this
    alert('title required');
    return;
  }
  await window.__DEMO_API.createTask({ title, description: 'Added from client' });
  // FIXME: optimistic updates would improve UX
  await renderTasks();
});

// initial render
renderTasks();

// NOTE: This file intentionally leaves many UX improvements out to create tasks
