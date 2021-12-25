// basic
import { VFC, useEffect } from 'react';
// components
import { EditorProps } from '../app/types';
// 3rd party library
import EditorJS from '@editorjs/editorjs';
import { uploadFile } from '../app/firebase';

const Editor: VFC<EditorProps> = (Props) => {
  const iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z"/></svg>';

  class EasyImage {
    //メニューバーにアイコンを追加
    static get toolbox() {
      return {
        title: 'ImageURL',
        icon: iconSVG
      };
    }

    //プラグインのUI処理
    render(){
      const div = document.createElement('div');
      const input = document.createElement('input');

      //画像URLが貼り付けられた時の処理
      input.addEventListener('paste', (event) => {
        const img = document.createElement('img');

        //貼り付けられたURLを取得
        if(event.clipboardData) {
          img.src = event.clipboardData.getData('text');
        }
        img.width = 200;

        //ブロックをリセット
        div.innerHTML = '';
        div.appendChild(img);

      });

      div.appendChild(input);

      return div;
    }

    //保存時のデータ抽出
    save(data: any){
      return {
        url: data.querySelector('img').src
      }
    }
  }
  const { content, changeContent } = Props;
  // tslint:disable-next-line:no-var-requires
  const Header = require('@editorjs/header');
  const List = require('@editorjs/list');
  const ImageTool = require('@editorjs/image');
  const SimpleImage = require('@editorjs/simple-image');
  const Table = require('@editorjs/table');
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
        table: Table,
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
            }
          }
        },
        simpleImage: EasyImage,
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