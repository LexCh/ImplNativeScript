import { Component, OnInit } from "@angular/core";
import { VideoRecorder, Options as VideoRecorderOptions } from 'nativescript-videorecorder';
import { RouterExtensions } from "nativescript-angular/router";
import * as camera from "nativescript-camera";
import { knownCollections } from "tns-core-modules/ui/page/page";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Image } from "tns-core-modules/ui/image";
import * as app from "tns-core-modules/application";
import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';


@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) { }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    openSettings() {
        // implement the cusotm logic
    }

    ngOnInit(): void {

    }
    onDrawerButtonTap(): void{
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onButtonTap(): void {
        camera.requestPermissions().then(
            function success() {
                const Options = {width:300, height: 300, keepAspectRatio:false,saveToGallery: true};
                camera.takePicture(Options).
                then((imageAsset) => {
                console.log("Tamano: " + imageAsset.options.width + "x" + imageAsset.options.height);
                console.log("keepAscpectRatio: " + imageAsset.options.keepAspectRatio);
                console.log("foto guardada");
            }).catch((err) => {
                        console.log("Error -> " + err.message);
                    });
            },
            function failure(){
                console.log("Permiso de camara no aceptado por el usuario");
            }

        );
    }
    takePicture(): void {

        let options: ImagePickerOptions = {
            android: {
                isCaptureMood: false, // if true then camera will open directly.
                isNeedCamera: true,
                maxNumberFiles: 10,
                isNeedFolderList: true
            }, ios: {
                isCaptureMood: false, // if true then camera will open directly.
                isNeedCamera: true,
                maxNumberFiles: 10
            }
        };

        let mediafilepicker = new Mediafilepicker();
        mediafilepicker.openImagePicker(options);

        mediafilepicker.on("getFiles", function (res) {
            let results = res.object.get('results');
            console.dir(results);
        });

        // for iOS iCloud downloading status
        mediafilepicker.on("exportStatus", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });

        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });

        mediafilepicker.on("cancel", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
    }

    onButtonTap1(): void {
        const options: VideoRecorderOptions = {
            hd: true,
            saveToGallery: true,
            duration: 30,
            format: 'mp4',
            size: 300,
            position:'back'
        }
        const videorecorder = new VideoRecorder(options)

        videorecorder.record().then((data) => {
            console.log(data.file)
            console.log("Video Guardado");
        }).catch((err) => {
            console.log(err)
        })
    }

    VideoTap(): void {
        let allowedVideoQualities = [];

        let options: VideoPickerOptions = {
            android: {
                isCaptureMood: false, // if true then camera will open directly.
                isNeedCamera: true,
                maxNumberFiles: 2,
                isNeedFolderList: true,
                maxDuration: 20,

            },
            ios: {
                isCaptureMood: false, // if true then camera will open directly.
                videoMaximumDuration: 10,
                allowedVideoQualities: allowedVideoQualities
            }
        };

        let mediafilepicker = new Mediafilepicker();
        mediafilepicker.openVideoPicker(options);

        mediafilepicker.on("getFiles", function (res) {
            let results = res.object.get('results');
            console.dir(results);
        });

        // for iOS iCloud downloading status
        mediafilepicker.on("exportStatus", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });

        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });

        mediafilepicker.on("cancel", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
    }

}
