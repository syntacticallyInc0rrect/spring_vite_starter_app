package edu.apus.enterprise.java.phillips.midterm.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.jdbc.JdbcTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @BeforeEach
    void truncateTestData() {
        JdbcTestUtils.deleteFromTables(jdbcTemplate, "user");
    }

    @Test
    void whenSaveNewUserIsCalledWithAvailableUsername_thenUsernameIsReturned() {
        NewUserDTO newUserDTO = NewUserDTO.builder().username("availableUsername").password("passwordispassword").build();
        Optional<UserDTO> result = userService.saveNewUser(newUserDTO);

        assertThat(result).isNotEmpty();
        assertEquals(result.get().getUsername(), newUserDTO.getUsername());
    }

    @Test
    void whenSaveNewUserIsCalledWithUnavailableUsername_thenEmptyIsReturned() {
        NewUserDTO newUserDTO = NewUserDTO.builder().username("unavailable").password("pswd").build();
        Optional<UserDTO> result = userService.saveNewUser(newUserDTO);

        assertThat(result).isNotEmpty();
        assertEquals(result.get().getUsername(), newUserDTO.getUsername());

        Optional<UserDTO> secondResult = userService.saveNewUser(newUserDTO);

        assertThat(secondResult).isEmpty();
    }

    @Test
    void whenGetUserByUsernameAndPasswordIsCalledWithValidCredentials_thenReturnCorrespondingUserDTO() {
        NewUserDTO newUserDTO = NewUserDTO.builder().username("youzuhname").password("cheerios").build();
        Optional<UserDTO> newUser = userService.saveNewUser(newUserDTO);

        assertThat(newUser).isNotEmpty();
        assertEquals(newUser.get().getUsername(), newUserDTO.getUsername());

        Optional<UserDTO> result = userService.getUserByUsernameAndPassword(newUserDTO.getUsername(), newUserDTO.getPassword());

        assertThat(result).isNotEmpty();
        assertEquals(result.get().getUsername(), newUserDTO.getUsername());
    }

    @Test
    void whenGetUserByUsernameAndPasswordIsCalledWithInvalidCredentials_thenReturnEmpty() {
        Optional<UserDTO> result = userService.getUserByUsernameAndPassword("notGonnaFindMe", "abc123");

        assertThat(result).isEmpty();
    }

}
