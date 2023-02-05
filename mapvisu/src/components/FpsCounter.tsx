import React, { ReactElement, useEffect, useState } from "react";

const TIMEFRAME_S = 3;

type FpsState = {
    avgFps: number;
    minFps: number;
    timestamps: number[];
};

/**
 * FPS counter for performance debugging.
 * @constructor
 */
function FpsCounter(): ReactElement {
    const [state, setState] = useState<FpsState>({
        avgFps: -1,
        minFps: -1,
        timestamps: [],
    });

    useEffect(() => {
        let isActive = true;
        function update(now: number) {
            if (!isActive) {
                return;
            }
            // keep looping at frequency of drawing
            requestAnimationFrame(update);

            setState((prevState) => {
                const newState = {
                    ...prevState,
                    timestamps: [...prevState.timestamps, performance.now()].filter(
                        (timestamp) => timestamp > now - TIMEFRAME_S * 1000,
                    ),
                };

                let maxDeltaMs = 0;
                let avgDeltaMs = 0;
                let prevTimestamp = 0;
                newState.timestamps.forEach((timestamp) => {
                    if (prevTimestamp) {
                        const delta = timestamp - prevTimestamp;
                        maxDeltaMs = Math.max(maxDeltaMs, delta);
                        avgDeltaMs += delta;
                    }
                    prevTimestamp = timestamp;
                });
                if (newState.timestamps.length > 1) {
                    avgDeltaMs /= newState.timestamps.length - 1;
                    newState.avgFps = 1000 / avgDeltaMs;
                    newState.minFps = 1000 / maxDeltaMs;
                } else {
                    newState.avgFps = -1;
                    newState.minFps = -1;
                }

                return newState;
            });
        }
        update(performance.now());

        // Reset on window focus, because otherwise it would look like FPS did drop.
        function onFocus() {
            setState({
                avgFps: -1,
                minFps: -1,
                timestamps: [performance.now()],
            });
        }
        window.addEventListener("focus", onFocus);

        return () => {
            isActive = false;
            window.removeEventListener("focus", onFocus);
        };
    }, []);

    function formatFps(fps: number): number {
        return fps >= 1 ? Math.floor(fps) : Math.round(fps * 100) / 100;
    }

    return (
        <div
            style={{
                position: "absolute",
                right: "0",
                top: "0",
                background: "red",
                color: "#fff",
            }}
            id={"fps-counter"}
        >
            <div title={`Average over ${TIMEFRAME_S} s`}>Average over {TIMEFRAME_S} s {formatFps(state.avgFps)}fps</div>
            <div title={`Minimum over ${TIMEFRAME_S} s`}>Minimum over {TIMEFRAME_S} s {formatFps(state.minFps)}fps</div>
        </div>
    );
}

export default FpsCounter;
