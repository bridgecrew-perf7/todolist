package main.controller;

import main.model.Settings;
import main.persistence.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

public class SettingsController
{

    @Autowired
    SettingsRepository settingsRepository;

    @GetMapping("/settings/")
    public String getColor(){
        return settingsRepository.findById(1).get().getColor();
    }

    @PostMapping("/settings/")
    public String setColor(String color){
        Settings settings = new Settings();
        settings.setId(1);
        settings.setColor(color);
        settingsRepository.save(settings);
        return settings.getColor();
    }

}
