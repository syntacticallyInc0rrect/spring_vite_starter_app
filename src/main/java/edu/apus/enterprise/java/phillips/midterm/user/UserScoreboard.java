package edu.apus.enterprise.java.phillips.midterm.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class UserScoreboard {
    private String username;
    private int totalGamesFinished;
    private int totalGamesAbandoned;
    private int bestTime;
    private int averageTime;
}
