import React from "react";

import Bear from "./../../Components/Images/full.png";
import Aone from "./../../Components/Images/catAOne.png";
import Atwo from "./../../Components/Images/catATwo.png";
import Bone from "./../../Components/Images/catBOne.png";
import Btwo from "./../../Components/Images/catBTwo.png";

export const HowToUse = () => {
	return (
		<div className="howToUse">
			<h1 className="useHead">How to Use Bearmax</h1>

			<p>
				Currently, Bearmax is capable of two modes, important to
				social-emotional learning facilitation:
			</p>
			<ol className="useList">
				<li>Emotion Recognition Game</li>
				<li>Stress Detection Mode </li>
			</ol>
			<div className="useContainer">
				<div className="textUse1">
					<h3 className="modeHeader">Emotion Recognition Game</h3>
					<p>
						This game is designed to help your child learn to
						recognize and convey several core emotions through
						engagement with Bearmax!
					</p>
					<ol>
						<li>
							To start the game, open the Bearmax app, log in, and
							press "Play!"
						</li>
						<li>
							Each round, Bearmax will portray a new core emotion.
							Bearmax currently supports Happy, Sad, and Angry,
							although a wider range of emotions is a high
							priority for our team!
						</li>
						<li>
							After Bearmax returns to its resting position, your
							child should do their best to mirror this emotion
							back to Bearmax!
						</li>
						<li>
							Bearmax will check to see if your child is
							expressing the chosen emotion. Once done correctly
							or after 15 seconds have passed, Bearmax will
							respond with positive feedback and start a new
							round!
						</li>
						<li>
							You can stop this game at any time with the "Stop
							Game" button on the mobile app. Additionally, you
							can press "Calibrate" to return Bearmax to its
							resting position if he loses sight of your child.
						</li>
						<li>
							Check your results here on the website when
							completed! These results will tell you how many
							emotions your child mirrored correctly for
							individual or over many sessions.
						</li>
					</ol>
				</div>
				<div className="bearContainer">
					<img
						src={Bear}
						className="useBear"
						alt="Design of bearmax, brown simple bear"
					/>
				</div>
			</div>

			<div className="useContainer">
				<div id="catElement">
					<h6 className="categoryHeader">Category A:</h6>
					<div className="catA">
						<img src={Aone} className="catOne" alt="..." />
						<img src={Atwo} className="catOne" alt="..." />
					</div>
					<h6 className="categoryHeader">Category B:</h6>
					<div className="catB">
						<img src={Bone} className="catTwo" alt="..." />
						<img src={Btwo} className="catTwo" alt="..." />
					</div>
				</div>
				<div className="textUse2">
					<h3 className="modeHeader">Stress Detection Mode</h3>
					<p>
						Stress detection is a built-in, passive feature that can
						be used alongside Bearmax while holding access to both
						the wearable device and website. This mode is currently
						recommended for sessions with a clinician.
					</p>
					<ol>
						<li>
							To begin stress detection mode, have your child wear
							the device on the wrist of their non-dominant hand.
						</li>
						<li>
							Connect the electrodes from the device to the
							following locations on the child's hand (based on
							their comfort). Copy the electrode placement of
							either Image Category A or Image Category B (see
							left).
							<ul>
								<li>
									Image A: Electrodes placed at the palm of
									the hand.
								</li>
								<li>
									Image B: Electrodes placed at the index and
									middle fingers.
								</li>
							</ul>
						</li>
						<li>
							Turn on the wearable device and log in to your
							account on this website.
						</li>
						<li>
							On the Main Dashboard page, lick "Start Recording"
							to connect the wearable device to the platform.
							<ul>
								<li>
									If successful, data will begin to populate a
									real-time graph for review.
								</li>
								<li>
									If unsuccessful, tips will be provided on
									how to re-connect the device.
								</li>
							</ul>
						</li>
						<li>
							Click "Stop Recording" to stop data collection from
							the Wearable Device and turn it off.
						</li>
						<li>
							Save the data to your computer by clicking "Save.”
						</li>
					</ol>
				</div>
			</div>
		</div>
	);
};

export default HowToUse;
