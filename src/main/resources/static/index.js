// Configuración de la API
const API_URL = 'http://localhost:8080/api/tasks';
let currentFilter = 'all';
let editingId = null;

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Event listeners para filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        loadTasks();
    });
});

// Event listener para crear tarea
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const task = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        completed: false
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            document.getElementById('taskForm').reset();
            loadTasks();
        }
    } catch (error) {
        console.error('Error al crear tarea:', error);
        alert('Error al crear la tarea. ¿Está el servidor corriendo?');
    }
});

// Cargar tareas
async function loadTasks() {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = '<div class="loading"> Cargando tareas...</div>';

    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        container.innerHTML = '<div class="empty-state"><div class="emoji"></div><p>Error al cargar las tareas. ¿Está el servidor corriendo?</p></div>';
    }
}

// Mostrar tareas según filtro
function displayTasks(tasks) {
    const container = document.getElementById('tasksContainer');

    // Aplicar filtro
    let filteredTasks = tasks;
    if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }

    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="emoji"></div>
                <p>No hay tareas ${currentFilter === 'all' ? '' : currentFilter === 'pending' ? 'pendientes' : 'completadas'}</p>
                <p style="font-size: 0.9rem;">¡Crea una nueva tarea para comenzar!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredTasks.map(task => `
        <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-checkbox">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
            </div>
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                <div class="task-description">${escapeHtml(task.description) || 'Sin descripción'}</div>
                <div class="task-meta">ID: ${task.id}</div>
            </div>
            <div class="task-actions">
                <button class="btn-icon edit" onclick="editTask(${task.id})">editar️</button>
                <button class="btn-icon delete" onclick="deleteTask(${task.id})">borrar</button>
            </div>
        </div>
    `).join('');
}

// Función para escapar HTML y prevenir XSS
function escapeHtml(text) {
    if (!text) return text;
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Marcar/desmarcar tarea como completada
async function toggleComplete(id) {
    try {
        // Intentamos con PATCH primero
        const response = await fetch(`${API_URL}/${id}/complete`, {
            method: 'PATCH'
        });

        if (response.ok) {
            loadTasks();
        } else {
            // Si no existe el endpoint PATCH, intentamos con PUT
            const taskResponse = await fetch(`${API_URL}/${id}`);
            const task = await taskResponse.json();
            task.completed = !task.completed;

            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            });
            loadTasks();
        }
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        alert('Error al actualizar la tarea');
    }
}

// Eliminar tarea
async function deleteTask(id) {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        alert('Error al eliminar la tarea');
    }
}

// Editar tarea
async function editTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const task = await response.json();

        document.getElementById('editTitle').value = task.title;
        document.getElementById('editDescription').value = task.description || '';
        editingId = id;

        document.getElementById('editModal').classList.add('active');
    } catch (error) {
        console.error('Error al cargar tarea:', error);
        alert('Error al cargar la tarea para editar');
    }
}

// Actualizar tarea
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const task = {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value
    };

    try {
        // Obtenemos la tarea actual para mantener su estado completed
        const currentTask = await fetch(`${API_URL}/${editingId}`).then(res => res.json());
        task.completed = currentTask.completed;

        const response = await fetch(`${API_URL}/${editingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            closeModal();
            loadTasks();
        }
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        alert('Error al actualizar la tarea');
    }
});

// Cerrar modal
function closeModal() {
    document.getElementById('editModal').classList.remove('active');
    editingId = null;
    document.getElementById('editForm').reset();
}

// Cerrar modal con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('editModal').classList.contains('active')) {
        closeModal();
    }
});

// Cerrar modal haciendo clic fuera
document.getElementById('editModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('editModal')) {
        closeModal();
    }
});