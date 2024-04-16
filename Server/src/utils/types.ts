export type EmotionGameStats = {
	Correct: number[];
	Wrong: number[];
	NumPlays: number;
	UserID: string;
};

export type EmotionGameAction = "start" | "stop" | "happy";

export type SensoryOverloadAidAction = "start" | "stop";

export type GSRStringData = {
	value: number;
	ts: Date;
};

export type BlobStringData = {
	mediaName: string;
	videoBool: boolean;
	audioBool: boolean;
};
