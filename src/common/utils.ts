export default class Utils {
    
    static randomInt(minInclusive: number, maxExclusive: number) {
        return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive)
    }

}