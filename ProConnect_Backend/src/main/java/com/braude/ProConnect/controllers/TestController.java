//package com.braude.ProConnect.controllers;
//
//import com.braude.ProConnect.models.entities.Role;
//import com.braude.ProConnect.models.entities.User;
//import com.braude.ProConnect.services.RoleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@RequestMapping("test")
//@CrossOrigin
//public class TestController {
//    @Autowired
//    private RoleService roleService;
//
//    @GetMapping("hello")
//    public String myTest()
//    {
//        System.out.print("Hello!");
//        return "HELLO WORLD!!!";
//    }
//
//    @GetMapping("hello2")
//    public String myTest2(String name)
//    {
//        return "HELLO " + name + "!!!";
//    }
//
//
//    @PostMapping("postBody")
//    public String postTest(@RequestBody String data, @RequestParam(value = "name") String name){
//        System.out.println(data);
//        return name + " requested DATA: " + data;
//    }
//
//    @PostMapping("postUser")
//    public String postUserTest(@RequestBody User user, @RequestParam(value = "name") String name){
//        System.out.println(user.toString() + user.getName());
//        return name + " requested DATA about: " + user;
//    }
//
//    @GetMapping("getUsers")
//    public ArrayList<User> getUsers(){
//        ArrayList<User> users = new ArrayList<User>();
//
//        return users;
//    }
//
//    @GetMapping("roles")
//    public List<Role> getRoles(){
//        return roleService.getRoles();
//    }
//}
