import { initialState, movieReducer } from "./movie.reducer";

describe("Movie Reducer", () => {
    describe("an unknown action", () => {
        it("should return the previous state", () => {
            const action = {} as any;

            const result = movieReducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
