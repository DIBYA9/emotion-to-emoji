prediction1 = "";
prediction2 = "";


Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    image_quality: 100
});
camera = document.getElementById("camera");

Webcam.attach('#camera');




function takesnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version is" + ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoded);





function modelLoded() {
    console.log("Model has loded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak1 = "prediction1 is" + prediction1;
    speak2 = "prediction2 is" + prediction2;
    utterthis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterthis);

}


function check() {
    img = document.getElementById('selfie');
    classifier.classify(img, gotResult);
}



function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }
        if (results[0].label == "happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        if (results[0].label == "angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548";
        }
        if (results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532";
        }
        if (results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522";
        }
        if (results[1].label == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548";
        }
    }
}