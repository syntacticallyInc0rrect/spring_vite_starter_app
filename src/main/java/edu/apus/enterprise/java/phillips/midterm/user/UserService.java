package edu.apus.enterprise.java.phillips.midterm.user;

import edu.apus.enterprise.java.phillips.midterm.game.Game;
import edu.apus.enterprise.java.phillips.midterm.game.GameDTO;
import edu.apus.enterprise.java.phillips.midterm.game.GameRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public UserService(
            UserRepository userRepository,
            GameRepository gameRepository
    ) {
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    Optional<UserDTO> getUserByUsernameAndPassword(String username, String password) {
        Optional<User> maybeUser = userRepository.findByUsernameAndPassword(username, password);
        return maybeUser.map(User::toUserDTO);
    }

    Optional<UserScoreboard> getScoreboardByUsername(String username) {
        Optional<User> maybeUser = userRepository.findByUsername(username);
        return maybeUser.map(User::toUserScoreboard);
    }

    Optional<UserDTO> saveNewUser(NewUserDTO newUserDTO) {
        Optional<User> maybeUser =
                userRepository.findByUsernameAndPassword(newUserDTO.getUsername(), newUserDTO.getPassword());
        if (maybeUser.isEmpty()) {
            return Optional.of(userRepository.save(newUserDTO.toUser()).toUserDTO());
        } else {
            return Optional.empty();
        }
    }

    Optional<Game> startGame(GameDTO gameDTO) {
        Optional<User> maybeUser = userRepository.findByUsername(gameDTO.getUsername());
        return maybeUser.map(u -> {
            Game newGame = u.addGame(gameDTO.getCurrentTime());
            userRepository.save(u);
            return newGame;
        });
    }

    Optional<Game> finishGame(GameDTO gameDTO) {
        Optional<User> maybeUser = userRepository.findByUsername(gameDTO.getUsername());
        return maybeUser.map(u -> {
            Game endedGame = u.endGame(gameDTO.getCurrentTime());
            userRepository.save(u);
            return endedGame;
        });
    }

}
