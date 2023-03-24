import Utils from "./utils";

describe('range', () => {

    it('with min=0, max=15 should return [0, 1, ..., 15]', () => {
        const actual = Utils.range(0, 15);
        let expected = [];
        for (let i = 0; i < 15; i++) expected.push(i);
        expect(actual).toEqual(expected);
    });

    it('with min=3, max=15 should return [3, 4, ..., 15]', () => {
        const actual = Utils.range(3, 15);
        let expected = [];
        for (let i = 3; i < 15; i++) expected.push(i);
        expect(actual).toEqual(expected);
    });

    it('with min=-3, max=15 should return [-3, -2, ..., 15]', () => {
        const actual = Utils.range(-3, 15);
        let expected = [];
        for (let i = -3; i < 15; i++) expected.push(i);
        expect(actual).toEqual(expected);
    });

    it('with min=-3, max=15, step=1 should return [-3, -2, ..., 15]', () => {
        const actual = Utils.range(-3, 15, 1);
        let expected = [];
        for (let i = -3; i < 15; i++) expected.push(i);
        expect(actual).toEqual(expected);
    });

    it('with min=-3, max=15, step=2 should return [-3, -1, ..., 15]', () => {
        const actual = Utils.range(-3, 15, 2);
        let expected = [];
        for (let i = -3; i < 15; i += 2) expected.push(i);
        expect(actual).toEqual(expected);
    });

    it('with min=-4, max=15, step=2 should return [-4, -2, ..., 14]', () => {
        const actual = Utils.range(-4, 15, 2);
        let expected = [];
        for (let i = -4; i < 15; i += 2) expected.push(i);
        expect(actual).toEqual(expected);
    });

    it('with min=-5, max=15, step=5 should return [-5, 1, 6, 11]', () => {
        const actual = Utils.range(-5, 15, 5);
        let expected = [];
        for (let i = -5; i < 15; i += 5) expected.push(i);
        expect(actual).toEqual(expected);
    });

});
