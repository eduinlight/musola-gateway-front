import { addService } from ".";

export class BrowserService {
  generateLangPath(lang: string, path: string) {
    return `/${lang}${path}`;
  }

  blobToFile(blob: Blob, name: string, type: string): File {
    const file = new File([blob], name, {
      type
    });

    // file.lastModifiedDate = new Date();
    return <File>file;
  }
}

addService(BrowserService);
