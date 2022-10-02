package edu.apus.enterprise.java.phillips.midterm.game;

import edu.apus.enterprise.java.phillips.midterm.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Data
@Table(name = "game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NonNull
    Instant startTime;
    Instant finishTime;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
