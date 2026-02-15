package sv.edu.udb.todoapi.service;

import org.springframework.stereotype.Service;
import sv.edu.udb.todoapi.model.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();
    private Long nextId = 1L;

    public List<Task> getAll() {
        return tasks;
    }

    public Task create(Task task) {
        task.setId(nextId++);
        tasks.add(task);
        return task;
    }

    public Optional<Task> getById(Long id) {
        return tasks.stream().filter(t -> t.getId().equals(id)).findFirst();
    }

    public boolean delete(Long id) {
        return tasks.removeIf(t -> t.getId().equals(id));
    }

    public Optional<Task> complete(Long id) {
        Optional<Task> task = getById(id);
        task.ifPresent(t -> t.setCompleted(true));
        return task;
    }

    public Task getTaskById(Long id) {
        return tasks.stream()
                .filter(task -> task.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Optional<Task> update(Long id, Task updatedTask) {
        return tasks.stream()
                .filter(t -> t.getId().equals(id))
                .findFirst()
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setCompleted(updatedTask.isCompleted());
                    return task;
                });
    }

}

