import affirmative from './affirmative';

describe('affirmative', function () {
  function generateFalseTest(str: string) {
    it(`parses \`${str}\` as false`, function () {
      expect(affirmative(str)).toBe(false);
    });
  }

  function generateTrueTest(str: string) {
    it(`parses \`${str}\` as true`, function () {
      expect(affirmative(str)).toBe(true);
    });
  }

  const falsey = ['n', 'no', 'nope', 'false', '0'];

  const truey = ['y', 'yes', 'yep', 'true', '1'];

  falsey.forEach(generateFalseTest);
  truey.forEach(generateTrueTest);

  [].concat(falsey, truey).forEach((str) =>
    it(`match strings CONTAINING \`${str}\` as undefined`, function () {
      expect(affirmative(`iaoi${str}abcde`)).toBeUndefined();
    }),
  );

  it('parses an non-matching string as undefined', function () {
    expect(affirmative('invalidstring')).toBeUndefined();
  });
});
