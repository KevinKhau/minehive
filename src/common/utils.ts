export default class Utils {

    static randomInt(minInclusive: number, maxExclusive: number) {
        return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive)
    }

    static range(minInclusive = 0, maxExclusive: number, step = 1) {
        return Array(Math.ceil((maxExclusive - minInclusive) / step))
            .fill(minInclusive)
            .map((x, y) => x + y * step)
    }

}
