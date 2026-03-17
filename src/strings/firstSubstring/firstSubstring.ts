export function strStr(str: string, f: string) {
  if (!str.length || !f.length) {
    return 0;
  }

  if (str.length < f.length || (!str.length && f.length)) {
    return -1;
  }
  let firstAppear = 0;
  const firstChar = f[0];
  for (let i = 0; i <= str.length - f.length; i++) {
    if (firstChar === str[i]) {
      firstAppear = i;
      for (let j = 0; j < f.length; j++) {
        if (str[j + i] !== f[j]) {
          firstAppear = -1;
          break;
        }
      }
      if (firstAppear !== -1) {
        return firstAppear;
      }
    }
  }
  return -1;
}
