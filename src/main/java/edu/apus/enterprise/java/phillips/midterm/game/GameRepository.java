package edu.apus.enterprise.java.phillips.midterm.game;

import edu.apus.enterprise.java.phillips.midterm.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<User, Long> {
    Game save(Game game);
}
