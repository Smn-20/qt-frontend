import media from '../../assets/images/media/qt.png'
import banner from '../../assets/images/media/banner.png'
import userIcon from '../../assets/images/media/user.png'


export const imagesData = (idx) => {
  const images = {
    media,  
    userIcon,
    banner
  }
  return images[idx]
}