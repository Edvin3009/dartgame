import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const startGame = async (player1, player2, score) => {
    try {
        const response = await axios.post(`${API_URL}/game/start`, null, {
            params: { player1, player2, score },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating game:', error);
        throw error;
    }
};

export const updateScore = async(player, t1, t2, t3) => {
    try {
        const response = await axios.post(`${API_URL}/game/score`, null, {
            params: { player, t1, t2, t3 },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating score:', error);
        throw error;
    }
}