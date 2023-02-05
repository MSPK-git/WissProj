export type Metric = "total-blocking-time" | "long-tasks" | "mainthread-work-breakdown";
export type Thresholds = {
    [key in Metric]?: number;
};
export type TestDefinition = {
    name: string;
    thresholds: Thresholds;
};

export const testDefinitions: TestDefinition[] = [
    {
        name: "follow-the-train",
        thresholds: {
            "total-blocking-time": 300,
            "long-tasks": 22,
            "mainthread-work-breakdown": 0.85,
        },
    },
    {
        name: "scrolling-autosuggest-search-options",
        thresholds: {
            "total-blocking-time": 10,
            "long-tasks": 2,
            "mainthread-work-breakdown": 0.3,
        },
    },
    {
        name: "zooming",
        thresholds: {
            "total-blocking-time": 400,
            "long-tasks": 10,
            "mainthread-work-breakdown": 0.85,
        },
    },
    {
        name: "moving-the-map",
        thresholds: {
            "total-blocking-time": 400,
            "long-tasks": 7,
            "mainthread-work-breakdown": 0.6,
        },
    },
    {
        name: "play-simulation-when-zoomed-out",
        thresholds: {
            "total-blocking-time": 4000,
            "long-tasks": 16,
            "mainthread-work-breakdown": 0.7,
        },
    },
    {
        name: "play-simulation-when-zoomed-to-medium",
        thresholds: {
            "total-blocking-time": 500,
            "long-tasks": 7,
            "mainthread-work-breakdown": 0.3,
        },
    },
    {
        name: "follow-train-when-zooming-in",
        thresholds: {
            "total-blocking-time": 5000,
            "long-tasks": 25,
            "mainthread-work-breakdown": 0.8,
        },
    },
    {
        name: "follow-train-when-zooming-out",
        thresholds: {
            "total-blocking-time": 20000,
            "long-tasks": 25,
            "mainthread-work-breakdown": 0.95,
        },
    },
];
