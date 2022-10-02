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
        System.out.println("inside service when I should not be");
        return Optional.empty();
    }

}
