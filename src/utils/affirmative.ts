const truthy = /^y$|^ye[sp]$|^true$|^1$/;
const falsey = /^n$|^no$|^nope$|^false$|^0$/;

export default function affirmative(str: string): boolean | undefined {
  if (truthy.test(str)) {
    return true;
  } else if (falsey.test(str)) {
    return false;
  }
}
