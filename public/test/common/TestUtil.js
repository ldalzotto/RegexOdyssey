export const TestUtil = {
    testForEachTimeInterval: function (timeLimit, timeoutInterval, conditionCallback, doneMocka) {
        let timeoutCount = 0;

        const validation = function () {
            if (conditionCallback()) {
                return undefined;
            } else {
                return "error";
            }
        };

        const recursion = function () {
            setTimeout(() => {
                if (timeoutCount * timeoutInterval > timeLimit) {
                    const validationResult = validation();
                    if (validationResult === undefined) {
                        doneMocka();
                    } else {
                        doneMocka(validationResult);
                    }
                } else {
                    const validationResult = validation();
                    if (validationResult === undefined) {
                        doneMocka();
                    } else {
                        timeoutCount = timeoutCount + 1;
                        recursion();
                    }
                }
            }, timeoutInterval);
        };

        recursion();
    }
};