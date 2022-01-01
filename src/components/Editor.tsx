// basic
import { VFC, useEffect } from 'react';
// components
import { EditorProps } from '../app/types';
// 3rd party library
import EditorJS from '@editorjs/editorjs';
import { uploadFile } from '../app/firebase';

const Editor: VFC<EditorProps> = (Props) => {
  const { content, changeContent } = Props;
  // tslint:disable-next-line:no-var-requires
  const Header = require('@editorjs/header');
  const List = require('@editorjs/list');
  const ImageTool = require('@editorjs/image');
  // const Table = require('@editorjs/table');
  const EditorJSStyle = require('editorjs-style');

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
        // table: Table,
        image: {
          class: ImageTool,
          config: {
            readOnly: false,
            uploader: {
              async uploadByFile(file: File) {
                const result = await uploadFile(file);
                return { success: 1, file: { url: result.url } };
              },
              uploadByUrl(url: string) {
                return new Promise((resolve) => {
                  resolve({ success: 1, file: { url: url } });
                });
              },
              uploadByLibrary(url: string) {
                return new Promise((resolve) => {
                  resolve({ success: 1, file: { url: 'https://firebasestorage.googleapis.com/v0/b/portfolio-cyoi.appspot.com/o/images%2Fman.png?alt=media&token=3092ccf4-7238-4458-8eaf-abd394285554' } });
                });
              }
            }
          }
        },
        style: EditorJSStyle.StyleInlineTool
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