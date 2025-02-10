import { modifierList } from './modifierList.js'
import { nicknameList } from './nicknameList.js'

export default class RandomNicknameGenerator {
  static async generateNickname() {
    let modifierRandomNumber: number = Math.floor(
      Math.random() * (modifierList.length - 0),
    )
    console.log(modifierRandomNumber)
    let nicknameRandomNumber: number = Math.floor(
      Math.random() * (nicknameList.length - 0),
    )
    console.log(nicknameRandomNumber)
    let randomNickname: string = `${modifierList[modifierRandomNumber]} ${nicknameList[nicknameRandomNumber]}`
    return randomNickname
  }
}
