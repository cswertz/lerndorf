class UploadAdapter {
  constructor(loader) {
    console.log(loader)
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.initRequest();
      this.initListeners(resolve, reject);
      this.sendRequest();
    });
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  initRequest() {
    this.xhr = new XMLHttpRequest();

    this.xhr.open('POST', '/api/files/editor-upload', true);
    this.xhr.responseType = 'json';
  }

  initListeners(resolve, reject) {
    const { xhr, loader } = this;
    const { file } = loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const { response } = xhr;
      if (!response || response.error) {
        const message = (response && response.error) ? response.errors[0].msg : genericErrorText;
        return reject(message);
      }

      return resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          loader.uploadTotal = e.total;
          loader.uploaded = e.loaded;
        }
      });
    }
  }

  sendRequest() {
    const data = new FormData();
    data.append('upload', this.loader.file);
    data.append('name', this.loader.file.name);

    this.xhr.send(data);
  }
}

export default UploadAdapter;
