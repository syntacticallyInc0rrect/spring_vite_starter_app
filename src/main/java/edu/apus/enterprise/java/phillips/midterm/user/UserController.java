package edu.apus.enterprise.java.phillips.midterm.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.MessageHandler;
import java.util.Optional;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/user/{password}/{username}/login")
    public ResponseEntity<UserDTO> getUserByUsernameAndPassword(
            @PathVariable String password,
            @PathVariable String username
    ) {
        Optional<UserDTO> maybeUserDTO = userService.getUserByUsernameAndPassword(username, password);
        return maybeUserDTO.map(userDTO -> ResponseEntity.ok().body(userDTO)).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/user")
    public ResponseEntity<UserDTO> getUserByUsernameAndPassword(@RequestBody NewUserDTO newUserDTO) {
        System.out.println("PRINT!");
        System.out.println(newUserDTO.getUsername());
        System.out.println(newUserDTO.getPassword());
        Optional<UserDTO> maybeUserDTO = userService.saveNewUser(newUserDTO);
        return maybeUserDTO.map(userDTO -> ResponseEntity.ok().body(userDTO)).orElse(ResponseEntity.badRequest().build());
    }

}
