import { modifierList } from './const/modifierList.js'
import { nicknameList } from './const/nicknameList.js'

export default class RandomNicknameGenerator {
  static generateNickname() {
    let modifierRandomNumber: number = Math.floor(
      Math.random() * (modifierList.length - 0),
    )
    let nicknameRandomNumber: number = Math.floor(
      Math.random() * (nicknameList.length - 0),
    )
    let randomNickname: string = `${modifierList[modifierRandomNumber]} ${nicknameList[nicknameRandomNumber]}`
    return randomNickname
  }
}
