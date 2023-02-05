import { normalizeAngle, round } from "./MathUtils";


export class Vector {

    constructor(public readonly x: number, public readonly y: number) {
    }

    /** The length (magnitude) of the vector. */
    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * The angle of this vector (radians).
     * The angle is 0 if the vector points exactly east (along the x-axis).
     * Angles increase clockwise and are positive (0<=a<=Pi) in the southern two quadrants (positive y in Canvas coordinates).
     * Angles decrease counter-clockwise and are negative (0>a>-Pi) in the northern two quadrants (negative y).
     * The angle is Pi if the vector points exactly west (along the x-axis).
     */
    public get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    public plus(other?: Vector): Vector {
        return other ? new Vector(this.x + other.x, this.y + other.y) : this;
    }

    public minus(other?: Vector): Vector {
        return other ? new Vector(this.x - other.x, this.y - other.y) : this;
    }

    public reverseY(): Vector {
        return new Vector(this.x, -this.y);
    }

    public reversed(): Vector {
        return new Vector(-this.x, -this.y);
    }

    /** Return this Vector rotated -90° degrees. */
    public rotatedMinus90(): Vector {
        return new Vector(this.y, -this.x);
    }

    /** Return this Vector rotated +90° degrees. */
    public rotatedPlus90(): Vector {
        return new Vector(-this.y, this.x);
    }

    /** Return this Vector rotated the given angle (a radians value). */
    public rotatedBy(angle: number): Vector {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        return new Vector(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
    }

    /** Return this Vector scaled by the given factor. */
    public scaledBy(factor: number): Vector {
        return new Vector(this.x * factor, this.y * factor);
    }

    /** Return this Vector scaled to a length of 1. */
    public normalized(): Vector {
        return this.scaledToLength(1);
    }

    /** Return this vector scaled to the given length. */
    public scaledToLength(length: number): Vector {
        if (this.isZero()) {
            return Vector.ZERO;
        }
        return this.scaledBy(length / this.length);
    }

    /**
     * Return this vector scaled so that its tip touches the line defined by points p1 and p2.
     * Return Vector.ZERO if no result is possible (e.g. if the given line is parallel to this vector).
    */
    public scaledToLine(p1: Vector, p2: Vector): Vector {
        if (this.isZero()) {
            return Vector.ZERO;
        }
        return Vector.calculateIntersection(Vector.ZERO, this, p1, p2) ?? Vector.ZERO;
    }

    /** Return this vector projected onto the given target vector. */
    public projectedOnto(target: Vector): Vector {
        if (this.isZero() || target.isZero()) {
            return Vector.ZERO;
        }
        return Vector.calculateIntersection(Vector.ZERO, target, this, this.plus(target.rotatedPlus90())) ?? Vector.ZERO;
    }



    /** Return a vector where both components (x and y) are rounded to the given number of decimal digits. */
    public rounded(decimals?: number): Vector {
        let x = round(this.x, decimals);
        let y = round(this.y, decimals);
        return new Vector(x, y);
    }

    public roundedString(decimals?: number): string {
        return this.rounded(decimals).toString();
    }

    /** Return the angle towards the given other vector. */
    public angleTowards(other: Vector): number {
        return normalizeAngle(other.angle - this.angle);
    }

    public equals(other: Vector) {
        return this.x === other.x && this.y === other.y;
    }

    public isZero(): boolean {
        return this.x === 0 && this.y === 0;
    }

    public toJSON() {
        return [Math.round(this.x * 1000) / 1000, Math.round(this.y * 1000) / 1000];
    }

    public toString(): string {
        return `(${round(this.x)},${round(this.y)})`;
    }

    /**
     * Calculate the intersection of two lines where the first line is given by points p1 and p2 and the
     * second line by points q1 and q2.
     * Return the intersection point (a Vector) or null if no intersection can be found (because the lines are parallel).
     */
    public static calculateIntersection(p1: Vector, p2: Vector, q1: Vector, q2: Vector): Vector | null {
        const
            a1 = p2.y - p1.y,
            b1 = p1.x - p2.x,
            c1 = a1 * p1.x + b1 * p1.y,
            a2 = q2.y - q1.y,
            b2 = q1.x - q2.x,
            c2 = a2 * q1.x + b2 * q1.y,
            denomiator = a1 * b2 - a2 * b1;

        if (denomiator === 0) {
            return null;
        } else {
            return new Vector(
                (b2 * c1 - b1 * c2) / denomiator,
                (a1 * c2 - a2 * c1) / denomiator
            );
        }
    }

    public static midpoint(a: Vector, b: Vector): Vector {
        return a.plus(b.minus(a).scaledBy(0.5));
    }

    public static ZERO = new Vector(0, 0);
    public static UNIT = new Vector(1, 0);
    public static UNKNOWN = new Vector(0, 0);
}

// Common directional vectors in a Canvas coordinate system (north points towards negative infinity on the y-axis).

/** A directional vector that points east. */
export const E = new Vector(1, 0);
/** A directional vector that points north-east. */
export const NE = new Vector(Math.SQRT1_2, -Math.SQRT1_2);
/** A directional vector that points north. */
export const N = new Vector(0, -1);
/** A directional vector that points north-west. */
export const NW = new Vector(-Math.SQRT1_2, -Math.SQRT1_2);
/** A directional vector that points west. */
export const W = new Vector(-1, 0);
/** A directional vector that points south-west. */
export const SW = new Vector(-Math.SQRT1_2, Math.SQRT1_2);
/** A directional vector that points south. */
export const S = new Vector(0, 1);
/** A directional vector that points south-east. */
export const SE = new Vector(Math.SQRT1_2, Math.SQRT1_2);

