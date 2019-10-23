import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-resume2',
  templateUrl: './resume2.page.html',
  styleUrls: ['./resume2.page.scss'],
})
export class Resume2Page implements OnInit {

  constructor(private filePath: FilePath, private fileChooser: FileChooser, private file: File) { }

  ngOnInit() {
  }

  choose(){
    this.fileChooser.open().then((uri) => {
      alert(uri);

      this.filePath.resolveNativePath(uri).then(filePath => {
        alert(filePath);
        let dirPathSegments = filePath.split('/');
        let fileName = dirPathSegments[dirPathSegments.length-1];
        dirPathSegments.pop();
        let dirPath = dirPathSegments.join('/');
        this.file.readAsArrayBuffer(dirPath, fileName).then(async (buffer) => {
          await this.upload(buffer, fileName);
        }).catch((err) => {
          alert(err.toString());
        });
      });
    });
  }

  async upload(buffer, name){
    let blob = new Blob([buffer], { type: "image/jpeg"});

    let storage = firebase.storage();

    storage.ref('images/' + name).put(blob).then((d)=>{
      alert("Done");
    }).catch((error)=>{
      alert(JSON.stringify(error))
    })

    }

  }


