import { VFC, useImperativeHandle, forwardRef, Ref, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import { uploadFile, downloadFile } from '../app/firebase';

export type Props = {
  content: {
    time: number,
    blocks: [],
    version: string
  };
  changeContent: any;
}

const Editor: VFC<Props> = (Props) => {
  const { content, changeContent } = Props;

  // tslint:disable-next-line:no-var-requires
  const Header = require('@editorjs/header');
  const List = require('@editorjs/list');
  const ImageTool = require('@editorjs/image');
  const SimpleImage = require('@editorjs/simple-image');

  function createEditor() {
    const setContent = () => {
      editor.save().then((outputData) => {
        changeContent(outputData);
      }).catch((error) => {
        console.log('Saving failed: ', error);
      });
    }
    const editor = new EditorJS({
      holderId: 'editorjs',
      readOnly: false,
      tools: {
        header: Header,
        list: List,
        image: {
          class: ImageTool,
          config: {
            readOnly: false,
            uploader: {
              async uploadByFile(file: File) {
                const result = await uploadFile(file);
                return result;
              },
              uploadByUrl(url: string) {
                return new Promise((resolve) => {
                  resolve({ success: 1, file: { url: url } });
                });
              },
            }
          }
        },
        simpleImage: SimpleImage
      },
      data: content,
      onChange: setContent
    });
  }


  useEffect(() => {
    createEditor();
  }, [])

  return (
    <div id="editorjs"></div>
  )
}

export default Editor;