package edu.apus.enterprise.java.phillips.midterm.user;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class NewUserDTO {
    @NonNull
    private String username;

    @NonNull
    private String password;

    public User toUser() {
        return User.builder().username(this.username).password(this.password).build();
    }
}
