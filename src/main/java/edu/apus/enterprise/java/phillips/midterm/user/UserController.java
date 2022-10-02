package edu.apus.enterprise.java.phillips.midterm.user;

import edu.apus.enterprise.java.phillips.midterm.game.Game;
import edu.apus.enterprise.java.phillips.midterm.game.GameDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/api/user/{username}/scoreboard")
    public ResponseEntity<UserScoreboard> getUserScoreboardByUsername(@PathVariable String username) {
        Optional<UserScoreboard> maybeUserScoreboard = userService.getScoreboardByUsername(username);
        return maybeUserScoreboard
                .map(userScoreboard -> ResponseEntity.ok().body(userScoreboard))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/user")
    public ResponseEntity<UserDTO> getUserByUsernameAndPassword(@RequestBody NewUserDTO newUserDTO) {
        Optional<UserDTO> maybeUserDTO = userService.saveNewUser(newUserDTO);
        return maybeUserDTO.map(userDTO -> ResponseEntity.ok().body(userDTO)).orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/api/user/start")
    public ResponseEntity<GameDTO> saveUserStartTime(@RequestBody GameDTO gameDTO) {
        Optional<Game> maybeGame = userService.startGame(gameDTO);
        return maybeGame
                .map(game -> ResponseEntity.ok().body(gameDTO))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/user/finish")
    public ResponseEntity<GameDTO> saveUserFinishTime(@RequestBody GameDTO gameDTO) {
        Optional<Game> maybeGame = userService.finishGame(gameDTO);
        return maybeGame
                .map(game -> ResponseEntity.ok().body(gameDTO))
                .orElse(ResponseEntity.notFound().build());
    }

}
