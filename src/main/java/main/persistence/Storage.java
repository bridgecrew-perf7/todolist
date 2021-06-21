package main.persistence;

import main.model.TaskEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class Storage   // Вариант "ручками" без использования CRUD Repository
{
    private static AtomicInteger currentId = new AtomicInteger(1);
    private static final ConcurrentHashMap<Integer, TaskEntity> taskList = new ConcurrentHashMap<>();
    
    public static List<TaskEntity> getAllTask(){
        ArrayList<TaskEntity> allTaskEntities = new ArrayList<>();
        allTaskEntities.addAll(taskList.values());
        return allTaskEntities;
    }

    public static TaskEntity getTask(int id){
        if(!taskList.containsKey(id)){
            return null;
        }
        return taskList.get(id);
    }
    
    public static int addTask(TaskEntity taskEntity){
        int id = currentId.get();
        taskEntity.setId(id);
        taskList.put(id, taskEntity);
        currentId.addAndGet(1);
        return taskEntity.getId();
    }

    public static TaskEntity deleteTask(int id){
        if(!taskList.containsKey(id)){
            return null;
        }
        TaskEntity taskEntity = taskList.get(id);
        taskList.remove(id);
        return taskEntity;
    }

    public static void deleteAllTask(){
        taskList.clear();
    }

    public static TaskEntity editTask(int id, TaskEntity newTaskEntity) {
        if (!taskList.containsKey(id)) {
            return null;
        } else {
            TaskEntity taskEntity = taskList.get(id);
            taskEntity.setDescription(newTaskEntity.getDescription());
            taskEntity.setName(newTaskEntity.getName());
            taskList.remove(id);
            taskList.put(id, taskEntity);
            return taskList.get(id);
        }
    }
}
