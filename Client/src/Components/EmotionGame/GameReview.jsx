/*
Correct/Wrong Index Correlations:
0: Happy
1: Sad
2: Angry
3: Neutral
*/

import { useContext, useEffect, useState } from "react";
import { buildPath } from "../BuildPath";
import { AuthContext } from "../../AuthContext";
import "./GameReview.css";
import StatsGraph, { LINE_COLORS, LINE_KEYS } from "./StatsGraph";
import useWindowDimensions from "../WindowDimensions";

const lineLabels = ["Happy", "Sad", "Angry", "Neutral"];

const GameReview = () => {
	const [allGames, setAllGames] = useState([]);
	const [showingLines, setShowingLines] = useState([true, true, true, true]);

	const { windowHeight, windowWidth } = useWindowDimensions();
	const { user } = useContext(AuthContext);

	const getAllGames = async () => {
		try {
			const res = await fetch(buildPath("/api/emotionRecognition/"), {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
			});

			if (res.status === 200) {
				let games = await res.json();

				// Convert Dates to JS and add percentages for each emotion
				games = games.map((game) => {
					const { Correct, Wrong, GameFin } = game;
					return {
						...game,
						GameFin: new Date(GameFin),
						CorrectPercent: Correct.map((val, index) => {
							const total = Correct[index] + Wrong[index];
							return total > 0 ? (val / total) * 100 : 0;
						}),
						WrongPercent: Wrong.map((val, index) => {
							const total = Correct[index] + Wrong[index];
							return total > 0 ? (val / total) * 100 : 0;
						}),
					};
				});

				// Sort in chronological order
				games.sort((a, b) => a.GameFin.getTime() - b.GameFin.getTime());
				setAllGames(games);
			}
		} catch (err) {
			console.error(err);
		}
		return [];
	};

	useEffect(() => {
		getAllGames();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const dimensions = {
		width: windowWidth * 0.75,
		height: Math.max(300, windowHeight * 0.5),
		margin: {
			top: 60,
			right: 60,
			bottom: 60,
			left: 60,
		},
	};

	return (
		<div id="gameReviewContainer">
			<StatsGraph
				data={allGames}
				dimensions={dimensions}
				showingLines={showingLines}
			/>
			<div className="centerThing">
				<div
					id="graphOptionsContainer"
					style={{
						width:
							dimensions.width +
							dimensions.margin.left +
							dimensions.margin.right,
					}}
				>
					<div className="centerThing">
						<div id="legend">
							<span className="graphOptionsHeader">Legend</span>
							<div className="optionItemsContainer">
								{LINE_KEYS.map((key, index) => (
									<div className="legendItem" key={key}>
										<span
											className="line-sample"
											style={{
												backgroundColor:
													LINE_COLORS[index],
											}}
										></span>
										<span className="line-label">
											= {key}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="centerThing">
						<div id="showLinesContainer">
							<span className="graphOptionsHeader">
								Include in Graph
							</span>
							<div className="optionItemsContainer">
								{showingLines.map((checked, index) => {
									return (
										<div
											key={index}
											className="checkContainer"
										>
											<input
												type="checkbox"
												className="lineCheckbox"
												id={`lineCheckbox${index}`}
												checked={checked}
												onChange={() => {
													showingLines[index] =
														!showingLines[index];
													setShowingLines([
														...showingLines,
													]);
												}}
											/>
											<label
												htmlFor={`lineCheckbox${index}`}
												className="checkboxLabel"
											>
												{lineLabels[index]}
											</label>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameReview;
