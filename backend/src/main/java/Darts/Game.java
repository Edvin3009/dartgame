package Darts;

import java.util.stream.IntStream;

public class Game {
    
    private Player p1;
    private Player p2;
    private boolean won;
    private Player winner;

    public Game(Player p1, Player p2){
        this.p1 = p1;
        this.p2 = p2;
        this.won = false;
        this.winner = null;
    }

    public void updateScore(Player p, int[] scores){
        
        int currentScore = p.getScore();
        int roundScore = IntStream.of(scores).sum();
        System.out.println(p.getScore());
        System.out.println(p.getName());

        if (currentScore < roundScore){
            return;
        }

        if (currentScore == roundScore){
            this.won = true;
            this.winner = p;
        }

        p.setScore(currentScore - roundScore);
        System.out.println(p.getScore());
        System.out.println(p.getName());
        return;
    }

    public int[] getScore(){
        int s1 = p1.getScore();
        int s2 = p2.getScore();
        return new int[]{s1, s2};
    }

    public Player getWinner() {
        return this.winner;
    }

    public Player getPlayer(String name){
        if (p1.getName().equals(name) || p2.getName().equals(name)){
            return p1.getName().equals(name) ? p1 : p2;
        }
        throw new IllegalArgumentException("Player with name " + name + " does not equal any of " + p1.getName() + " or " + p2.getName());
    }

    public boolean gameOver() {
        return this.won;
    }

    public static void main(String[] args){

    }
    
}

