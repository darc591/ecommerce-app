import { Dropzone as UiDropzone, FileMosaic, DropzoneProps, ExtFile } from '@dropzone-ui/react';
import { useState } from 'react';

const Dropzone = ({ onChange, accept, label }: DropzoneProps) => {
  const [files, setFiles] = useState<ExtFile[]>([]);

  return (
    <UiDropzone
      localization='ES-es'
      value={files}
      onChange={(files) => {
        setFiles(files);
        onChange?.(files);
      }}
      footer={false}
      maxFiles={1}
      accept={accept}
      label={label}
      style={{
        fontSize: '16px',
      }}
    >
      {files.map((file) => <FileMosaic {...file} preview />)}
    </UiDropzone>
  );
};

export default Dropzone;
