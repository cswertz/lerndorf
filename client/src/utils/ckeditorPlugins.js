import UploadAdapter from './uploadAdapter';

function CustomUploadAdapterPlugin(editor) {
  // eslint-disable-next-line no-param-reassign
  editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader);
}

export default CustomUploadAdapterPlugin;
