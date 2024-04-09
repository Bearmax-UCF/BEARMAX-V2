export type EmotionGameStats = {
	Correct: number[];
	Wrong: number[];
	NumPlays: number;
	UserID: string;
};

export type EmotionGameAction = "start" | "stop";

export type SensoryOverloadAidAction = "start" | "stop";

export type GSRStringData = {
	value: number;
	ts: Date;
};

export type BlobStringData = {
<<<<<<< HEAD
	mediaURL: string;
};
=======
	mediaName: string;
	videoBool: boolean;
	audioBool: boolean;
};
>>>>>>> parent of 71b65dd (trying to get pull request to work)
