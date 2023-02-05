const powersOfTen = [1];
for (let i=0; i<15; i++) {
    powersOfTen.push(powersOfTen[powersOfTen.length-1]*10);
}

/**
 * Round the given double value to the specified number of decimals.
 * Make sure -0 is converted to 0.
 */
export function round(num: number, decimals?: number) {
    if (decimals === undefined) {
        // No decimals given -> round to 12 effective decimal digits.
        // This means: for a 2-digit number, round to 10 fractional digits, for a 7-digit number round to 5 fractional digits etc.
        var n =  Math.round(Math.log(Math.abs(num)) / Math.LN10);
        decimals = Math.max(12-n, 0);
    }

    const factor = powersOfTen[decimals];
    if (factor) {
        num = Math.round(num*factor) / factor;
    }
    return Object.is(num, -0) ? 0 : num;
}

/** Return the given number restricted to the given range (min,max).  */
export function restrictToRange(num:number, range:[number, number]) {
    return Math.max(range[0], Math.min(range[1], num));
}

/** Return the given number restricted to the given minimum / maximum.  */
export function restrictToMinMax(num:number, min: number, max: number) {
    return Math.max(min, Math.min(max, num));
}

/** Return the given (radians) angle as a normalized radians angle in range -Pi<ang<=Pi */
export function normalizeAngle(angle: number): number {
    while (angle > Math.PI) {
        angle -= 2 * Math.PI;
    }
    while (angle <= - Math.PI) {
        angle += 2 * Math.PI;
    }
    return angle;
}

/** Convert the given radians angle to degees. */
export function toDegrees(radians: number): number {
    return normalizeAngle(radians) / Math.PI * 180;
}

/** Return the given degree angle to radians. */
export function toRadians(degrees: number): number {
    return normalizeAngle(degrees / 180 *  Math.PI);
}
