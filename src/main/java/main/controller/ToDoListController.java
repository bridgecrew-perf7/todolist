package main.controller;

import main.model.TaskEntity;
import main.sevrice.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ToDoListController {

    private final TaskService taskService;

    public ToDoListController(TaskService taskService){
        this.taskService = taskService;
    }

    @RequestMapping(value = "/taskList/", method = RequestMethod.GET)
    public List<TaskEntity> list() {
        return taskService.list();
    }

    @PostMapping("/taskList/")
    public int addTask(TaskEntity taskEntity) {
        return taskService.createTask(taskEntity);
    }

    @GetMapping("/taskList/{id}")
    public ResponseEntity getTask(@PathVariable int id) {
        return taskService.getTask(id);
    }

    @DeleteMapping("/taskList/{id}")
    public Optional<TaskEntity> deleteTask(@PathVariable int id) {
        return taskService.deleteTask(id);
    }

    @DeleteMapping("/taskList/")
    public void deleteAllTask() {
        taskService.deleteAllTask();
    }

    @PutMapping("/taskList/{id}")
    public ResponseEntity editTask(@PathVariable("id") TaskEntity editTask, @RequestBody TaskEntity newTaskEntity) {
        return taskService.update(editTask, newTaskEntity);
    }

}
