package edu.apus.enterprise.java.phillips.midterm.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class NewUserDTO {
    private String username;
    private String password;

    public User toUser() {
        return User.builder().username(this.username).password(this.password).build();
    }
}
