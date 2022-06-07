import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedImage: any;

  constructor() {}

  checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web' || Capacitor.getPlatform() == 'ios') return true;
    return false;
  }

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      width: 600,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
    console.log('image: ', image);
    this.selectedImage = image;
    if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;
  }

  async share() {
    await Share.share({
      title: 'Share picture via whatsapp',
      text: 'Sharing an Image',
      url: this.selectedImage.path,
      dialogTitle: 'Share with whatsapp',
    });
  }

}
