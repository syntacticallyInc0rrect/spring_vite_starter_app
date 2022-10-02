package edu.apus.enterprise.java.phillips.midterm.user;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    Optional<UserDTO> getUserByUsernameAndPassword(String username, String password) {
        Optional<User> maybeUser = userRepository.findByUsernameAndPassword(username, password);
        return maybeUser.map(User::toUserDTO);
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

}
