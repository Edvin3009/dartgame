package Darts;

public class Player {
    
    private final String name;
    private int score;
    private int nthrows;

    public Player(String name, int score){
        this.name = name;
        this.score = score;
        this.nthrows = 0;
    }

    public String getName(){
        return this.name;
    }

    public int getScore(){
        return this.score;
    }

    public void setScore(int newScore){
        this.score = newScore;
        return;
    }

    public void registerThrows(int n){
        this.nthrows += n;
        return;
    }

    public int getNthrows(){
        return this.nthrows;
    }

    public int getAverage(){
        return (501 - this.score) / nthrows;
    }

    public static void main(String[] args){
    }
}
