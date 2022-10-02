package edu.apus.enterprise.java.phillips.midterm.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class UserControllerTest {
    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = Mockito.mock(UserService.class);
    }

    @Test
    void whenUserSendsValidLoginCredentials_thenCorrespondingUsernameIsReturned() throws Exception {
        User userCredentials = User.builder().username("fredFlintstone").password("dabadabadoo").build();
        UserDTO userDTO = userCredentials.toUserDTO();
        when(userService.getUserByUsernameAndPassword(userCredentials.getUsername(), userCredentials.getPassword()))
                .thenReturn(Optional.of(userDTO));

        MockMvcBuilders.standaloneSetup(new UserController(userService))
                .build()
                .perform(get("/api/user/" + userCredentials.getPassword() + "/" + userCredentials.getUsername() + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(userDTO.getUsername()));
    }

    @Test
    void whenUserSendsInvalidLoginCredentials_thenNotFoundIsReturned() throws Exception {
        User userCredentials = User.builder().username("lukeSkywalker").password("theforce").build();
        when(userService.getUserByUsernameAndPassword(userCredentials.getUsername(), userCredentials.getPassword()))
                .thenReturn(Optional.empty());

        MockMvcBuilders.standaloneSetup(new UserController(userService))
                .build()
                .perform(get("/api/user/" + userCredentials.getPassword() + "/" + userCredentials.getUsername() + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    void whenUserSendsValidRegistrationCredentials_thenCorrespondingUsernameIsReturned() throws Exception {
        NewUserDTO newUserDTO = new NewUserDTO("marvel", "dcComics");
        UserDTO userDTO = UserDTO.builder().username(newUserDTO.getUsername()).build();
        when(userService.saveNewUser(refEq(newUserDTO))).thenReturn(Optional.of(userDTO));

        MockMvcBuilders.standaloneSetup(new UserController(userService))
                .build()
                .perform(post("/api/user")
                        .content("""
                                {
                                    "username": "marvel",
                                    "password": "dcComics"
                                }
                                """)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(userDTO.getUsername()));

    }

    @Test
    void whenUserSendsRegistrationCredentialsThatAreNotAvailable_thenBadRequestIsReturned() throws Exception {
        NewUserDTO newUserDTO = NewUserDTO.builder().username("python").password("java").build();
        when(userService.saveNewUser(newUserDTO))
                .thenReturn(Optional.empty());

        MockMvcBuilders.standaloneSetup(new UserController(userService))
                .build()
                .perform(post("/api/user")
                        .content("""
                                {
                                    "username": "python",
                                    "password": "java"
                                }
                                """)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest());
    }
}
