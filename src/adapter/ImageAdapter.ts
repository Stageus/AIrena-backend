import Image from '#entity/Image'
import ImageRepository from '#repository/ImageRepsitory'

export default class ImageAdapter {
  static async insertImage(image: Image) {
    await ImageRepository.insertImage(image.articleIdx, image.urls)
  }
}
