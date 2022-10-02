package edu.apus.enterprise.java.phillips.midterm.user;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class UserDTO {
    @NonNull
    private String username;
}
