package main.controller;

import main.model.Settings;
import main.model.TaskEntity;
import main.persistence.SettingsRepository;
import main.persistence.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Optional;

@Controller
public class DefaultController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    SettingsRepository settingsRepository;

    @RequestMapping("/")
    public String index(Model model) {

        Iterable<TaskEntity> iterable = taskRepository.findAll();
        ArrayList<TaskEntity> taskEntities = new ArrayList<>();
        iterable.forEach(taskEntities::add);

        Optional<Settings> optional = settingsRepository.findById(1);
        String color = "white";
        if (optional.isPresent()){
            color = optional.get().getColor();
        }

        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("dd MMMM yyyy"));
        String time = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));
        String dateTime = date + " " + time;

        model.addAttribute("tasks", taskEntities);
        model.addAttribute("taskCount", taskEntities.size());
        model.addAttribute("date", dateTime);

        model.addAttribute("color", color);

        return "index";
    }

}
