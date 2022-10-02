package edu.apus.enterprise.java.phillips.midterm.game;

import lombok.*;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class GameDTO {
    @NonNull
    private String username;
    @NonNull
    private Instant currentTime;
}
