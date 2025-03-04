package Darts;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/game")
public class GameController {
    private Game game;

    @PostMapping("/start")
    public String startGame(@RequestParam String player1, @RequestParam String player2, @RequestParam int score) {
        game = new Game(new Player(player1, score), new Player(player2, score));
        return "Game started between " + player1 + " and " + player2;
    }

    @PostMapping("/score")
    public int updateScore(@RequestParam String player, @RequestParam int t1, @RequestParam int t2, @RequestParam int t3) {
        if (game == null) throw new IllegalArgumentException("No current game");
        
        Player p = game.getPlayer(player);
        System.out.println(p.getName());
        int[] scores = {t1, t2, t3};

        game.updateScore(p, scores);
        return p.getScore();
    }

    // @GetMapping("/score")
    // public int[] getScore() {
    //     return game.getScore();
    // }

    // @GetMapping("/winner")
    // public String getWinner() {
    //     return game.getWinner() != null ? game.getWinner().getName() : "No winner yet";
    // }
}
