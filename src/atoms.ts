import { atom } from "recoil";

// recoil의 atom() function 사용
// atom()이 요구하는 두 가지: key(유일한 이름), default value
export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});
