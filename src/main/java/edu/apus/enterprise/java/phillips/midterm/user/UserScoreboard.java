package edu.apus.enterprise.java.phillips.midterm.user;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class UserScoreboard {
    @NonNull
    private String username;
    private int totalGamesFinished;
    private int totalGamesAbandoned;
    private int bestTime;
    private int averageTime;
}
