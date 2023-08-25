package com.braude.ProConnect.controllers;

import com.braude.ProConnect.entities.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("test")
@CrossOrigin
public class TestController {
    @GetMapping("hello")
    public String myTest()
    {
        System.out.print("Hello!");
        return "HELLO WORLD!!!";
    }

    @GetMapping("hello2")
    public String myTest2(String name)
    {
        return "HELLO " + name + "!!!";
    }


    @PostMapping("postBody")
    public String postTest(@RequestBody String data, @RequestParam(value = "name") String name){
        System.out.println(data);
        return name + " requested DATA: " + data;
    }

    @PostMapping("postUser")
    public String postUserTest(@RequestBody User user, @RequestParam(value = "name") String name){
        System.out.println(user.toString() + user.getName());
        return name + " requested DATA about: " + user;
    }

    @GetMapping("getUsers")
    public ArrayList<User> getUsers(){
        ArrayList<User> users = new ArrayList<User>();
        users.add(new User("Hadi", "hadi@gmail.com"));
        users.add(new User("Aziz", "aziz@gmail.com"));
        return users;
    }
}
