package main.sevrice;

import main.model.TaskEntity;
import main.persistence.TaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public int createTask(TaskEntity taskEntity) {
        TaskEntity newTaskEntity = taskRepository.save(taskEntity);
        return newTaskEntity.getId();
    }

    public List<TaskEntity> list() {
        Iterable<TaskEntity> iterable = taskRepository.findAll();
        ArrayList<TaskEntity> taskEntities = new ArrayList<>();
        for (TaskEntity taskEntity : iterable) {
            taskEntities.add(taskEntity);
        }
        return taskEntities;
    }

    public ResponseEntity getTask(int id) {
        Optional<TaskEntity> optional = taskRepository.findById(id);
        return optional.map(taskEntity -> new ResponseEntity(taskEntity, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    public ResponseEntity update(@PathVariable("id") TaskEntity editTask, @RequestBody TaskEntity newTaskEntity) {
        Optional<TaskEntity> optional = taskRepository.findById(editTask.getId());
        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } else {
            if (newTaskEntity.isFinishTask()) {
                newTaskEntity.setFinishDate(newTaskEntity.getCurrentDate());
                BeanUtils.copyProperties(newTaskEntity, editTask, "id", "name", "description", "creationDate");
                optional.get().setFinishDate(newTaskEntity.getCurrentDate());
            } else {
                if (newTaskEntity.getName() != null && newTaskEntity.getDescription() != null) {
                    BeanUtils.copyProperties(newTaskEntity, editTask, "id", "creationDate", "finishTask", "finishDate");
                } else {
                    BeanUtils.copyProperties(newTaskEntity, editTask, "id", "name", "description", "creationDate");
                }
            }
            taskRepository.save(optional.get());
            return new ResponseEntity(taskRepository.save(optional.get()), HttpStatus.OK);
        }
    }

    public Optional<TaskEntity> deleteTask(@PathVariable int id) {
        Optional<TaskEntity> task = taskRepository.findById(id);
        taskRepository.deleteById(id);
        return task;
    }

    public void deleteAllTask() {
        taskRepository.deleteAll();
    }

}
