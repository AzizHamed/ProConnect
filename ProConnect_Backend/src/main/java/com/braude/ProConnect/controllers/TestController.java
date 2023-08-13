package com.braude.ProConnect.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
public class TestController {
    @GetMapping("hello")
    public String myTest()
    {
        return "HELLO WORLD!!!";
    }

    @GetMapping("hello2")
    public String myTest2(String name)
    {
        return "HELLO " + name + "!!!";
    }
}
