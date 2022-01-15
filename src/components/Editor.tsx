// basic
import { VFC, useEffect, useContext } from 'react';
// components
import { DataContext } from '../App';
import { EditorProps } from '../app/types';
// 3rd party library
import EditorJS from '@editorjs/editorjs';
import { uploadFile } from '../app/firebase';

const Editor: VFC<EditorProps> = (Props) => {
  const { content, changeContent } = Props;
  const fileList = useContext(DataContext).files;

  // tslint:disable-next-line:no-var-requires
  const Header = require('@editorjs/header');
  const List = require('@editorjs/list');
  const ImageTool = require('@editorjs/image');
  const SimpleImage = require('@editorjs/simple-image');
  // const Table = require('@editorjs/table');
  const EditorJSStyle = require('editorjs-style');

  const LibraryIcon = '<svg id="lab" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M1.859 6l-.489-2h21.256l-.491 2h-20.276zm1.581-4l-.439-2h17.994l-.439 2h-17.116zm20.56 16h-24l2 6h20l2-6zm-20.896-2l-.814-6h19.411l-.839 6h2.02l1.118-8h-24l1.085 8h2.019zm2.784-3.995c-.049-.555.419-1.005 1.043-1.005.625 0 1.155.449 1.185 1.004.03.555-.438 1.005-1.044 1.005-.605 0-1.136-.449-1.184-1.004zm7.575-.224l-1.824 2.68-1.813-1.312-2.826 2.851h10l-3.537-4.219z"/></svg>';

  class EasyImage {
    //メニューバーにアイコンを追加
    static get toolbox() {
      return {
        title: 'Image Library',
        icon: LibraryIcon
      };
    }

    //プラグインのUI処理
    render() {
      const div = document.createElement('div');
      const LibraryTrigger = document.querySelector('#lab');
      const box = document.createElement('div');
      const selectImage = (url: string) => {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'insertImg'
        div.appendChild(img);
        box.classList.remove('show');
      }
      box.className = 'selectionBox';
      const ul = document.createElement('ul');
      fileList.forEach(item => {
        const li = document.createElement('li');
        li.onclick = () => {
          const url = li.querySelector('img')?.src;
          selectImage(url as string);
        }
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.name;
        li.appendChild(img);
        ul.appendChild(li);
      })
      box.appendChild(ul);
      (LibraryTrigger as Element).addEventListener('click', () => {
        div.appendChild(box);
        box.classList.add('show');
      })
      
      return div;
    }

    //保存時のデータ抽出
    save(imageData: any) {
      console.log(imageData);
      if (imageData.querySelector('.insertImg')){
        return {
          url: imageData.querySelector('.insertImg').src
        }
      }
    }
  }

  function createEditor() {
    const setContent = () => {
      editor.save().then((outputData) => {
        const result = {
          time: outputData.time,
          version: outputData.version,
          blocks: outputData.blocks.filter(item => item.data !== undefined)
        }
        console.log(result);
        changeContent(result);
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
        library: EasyImage,
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