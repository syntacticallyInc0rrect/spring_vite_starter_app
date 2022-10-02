package edu.apus.enterprise.java.phillips.midterm.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.apus.enterprise.java.phillips.midterm.game.Game;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    @NonNull
    private String username;
    @NonNull
    private String password;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Game> games;

    public Game addGame(Instant startTime) {
        if (Objects.isNull(this.games)) {
            this.setGames(new ArrayList<>());
        }
        Game game = Game
                .builder()
                .user(this)
                .startTime(startTime)
                .build();
        this.games.add(game);
        return game;
    }

    public Game endGame(Instant finishTime) {
        Game latestGame = this.games.get(this.games.size() - 1);
        latestGame.setFinishTime(finishTime);
        return latestGame;
    }

    public UserDTO toUserDTO() {
        return new UserDTO(this.username);
    }

    public UserScoreboard toUserScoreboard() {
        List<Long> timesForGamesCompleted = this.games
                .stream()
                .filter(g -> !Objects.isNull(g.getFinishTime()))
                .map(game -> game.getFinishTime().getEpochSecond() - game.getStartTime().getEpochSecond())
                .toList();
        List<Game> gamesAbandoned = this.games
                .stream()
                .filter(g -> Objects.isNull(g.getFinishTime()))
                .toList();
        Optional<Long> bestGameRecorded = timesForGamesCompleted.stream().sorted().findFirst();
        long bestTimeRecorded = bestGameRecorded.isEmpty() ? 0L : bestGameRecorded.get();
        int averageGameCompletionTime =
                (timesForGamesCompleted.stream().mapToInt(Long::intValue).sum()) /
                        (timesForGamesCompleted.size());

        if (this.games.isEmpty())
            return UserScoreboard.builder().username(this.username).build();

        if (this.games.stream().allMatch(g -> Objects.isNull(g.getFinishTime())))
            return UserScoreboard
                    .builder()
                    .username(this.username)
                    .totalGamesAbandoned(gamesAbandoned.size())
                    .build();
        else
            return UserScoreboard
                    .builder()
                    .username(this.username)
                    .totalGamesFinished(timesForGamesCompleted.size())
                    .totalGamesAbandoned(gamesAbandoned.size())
                    .bestTime((int) bestTimeRecorded)
                    .averageTime(averageGameCompletionTime)
                    .build();
    }
}
