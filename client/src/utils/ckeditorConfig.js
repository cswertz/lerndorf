import CustomUploadAdapterPlugin from './ckeditorPlugins';

const editorConfig = {
  extraPlugins: [CustomUploadAdapterPlugin],
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  },
  image: {
    resizeOptions: [
      {
        name: 'imageResize:original',
        label: 'Original',
        value: null,
      },
      {
        name: 'imageResize:50',
        label: '50%',
        value: '50',
      },
      {
        name: 'imageResize:75',
        label: '75%',
        value: '75',
      },
    ],
    styles: ['full', 'side', 'alignLeft', 'alignRight', 'alignCenter'],
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      '|',
      'imageResize',
      '|',
      'imageTextAlternative',
    ],
  },
  mediaEmbed: {
    previewsInData: true,
  },
};

const editorConfigSimple = {
  extraPlugins: [CustomUploadAdapterPlugin],
  toolbar: {
    items: ['bold', 'italic', 'link', 'bulletedList', 'numberedList'],
  },
};

export { editorConfig, editorConfigSimple };
