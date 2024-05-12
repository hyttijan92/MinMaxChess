import Header from "../components/Header";
import Minmax from "../images/minmax.svg";
import Alphabeta from "../images/alphabeta.svg";
import { heuristicMinMax, heuristicAlphaBeta, decisionRandom } from "../codes/codes";
function Engines() {
    return (
        <>
            <Header />
            <div className="container mx-auto grid justify-center">
                <h1 className={"text-2xl"}>Chess engines</h1>
                <p>There are three chess engines to compete against: MinMax engine, AlphaBeta engine and Random engine. </p>
                <h2 className={"text-xl"}>MinMax engine</h2>
                <p>The Minimax algorithm is a decision-making algorithm commonly used in two-player turn-based games such as chess or tic-tac-toe. It operates by recursively evaluating possible future moves and outcomes. At each level of the game tree, it alternates between maximizing the player's score (if it's the player's turn) and minimizing the opponent's score (if it's the opponent's turn). This process continues until a terminal state or a predetermined depth is reached. Ultimately, the algorithm selects the move that leads to the best possible outcome for the player, assuming optimal play from both players.</p>
                <img src={Minmax} alt="Minmax" />
                <p>Picture illustrates how min max algorithm works in action.</p>
                <h2 className={"text-xl"}>Heuristic function of the MinMax engine</h2>
                <p>Following code is the heuristic function of the MinMax engine. Heuristic function is used to evaluate the situation of the board. MinMax engine uses very simple heuristic. If the board represents a checkmate, it assigns a large positive score if white wins and a large negative score if black wins. If the game is a stalemate or there's insufficient material to win, it returns a neutral score. It then iterates through all squares on the board, updating the scores based on the value of each piece. Finally, it returns the difference between white's score and black's score as the overall evaluation of the board.</p>
                <code className=" rounded-lg block p-4 bg-gray-900 text-gray-100 whitespace-pre overflow-x-scroll">
                    {heuristicMinMax}
                </code>
                <h2 className={"text-xl"}>Alphabeta engine</h2>
                <p>Alpha-beta pruning is an enhancement to the basic Minimax algorithm, aimed at reducing the number of nodes evaluated in the game tree. It achieves this by intelligently disregarding branches of the tree that are deemed irrelevant to the final decision. Alpha-beta pruning maintains two values, alpha and beta, representing the best scores found so far for the maximizing and minimizing players, respectively. By comparing these values with each node's evaluation, the algorithm can discard branches that won't affect the final decision, thus significantly reducing the search space. This technique allows for more efficient computation compared to the straightforward Minimax approach, making it feasible to explore deeper into the game tree within the same time constraints.</p>
                <img src={Alphabeta} alt="Alphabeta" />
                <p>Picture illustrates how alpha beta pruning differs from min max. As we can see the final node can be pruned, since it does not affect the outcome.</p>
                <h2 className={"text-xl"}>Heuristic function of the AlphaBeta engine</h2>
                <p>Following code is the heuristic function of the AlphaBeta engine. Heuristic function is used to evaluate the situation of the board. This heuristic function is similar to MinMax engine's heuristic function, but it extends the heuristic function by incorporating additional evaluation criteria based on piece-square tables. It adjusts the scores of pieces based on their positions on the board. For each piece, it considers its type and adds a bonus or penalty depending on its position, contributing to a more nuanced evaluation. This heuristic function provides a more detailed assessment of the board state by considering both piece values and positional advantages. By doing so, it aims to improve the accuracy of the heuristic evaluation, leading to better decision-making in the game-playing algorithm.</p>
                <code className=" rounded-lg block p-4 bg-gray-900 text-gray-100 whitespace-pre overflow-x-scroll">
                    {heuristicAlphaBeta}
                </code>
                <h2 className={"text-xl"}>Random engine</h2>
                <p>Random chooses random move from all the possible moves. The engine serves mostly for testing purpouses.</p>
                <h2 className={"text-xl"}>Decision function of the Random engine</h2>
                <code className=" rounded-lg block p-4 bg-gray-900 text-gray-100 whitespace-pre overflow-x-scroll">
                    {decisionRandom}
                </code>
            </div>
        </>
    )
}
export default Engines;