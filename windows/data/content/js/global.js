$( document ).ready(function() {
    bindElements();
});
function bindElements() {
	$("#walgen").click(function() {
		hideAllMainContainers();
		$("#walletgenerator").show();
	});
	$("#bulkgen").click(function() {
		hideAllMainContainers();
		$("#bulkgenerater").show();
	});
    $("#generatewallet").click(function() {
		generateSingleWallet();
	});
    $("#printqr").click(function() {
		printQRcode();
	});
}

function hideAllMainContainers() {
	$("#walletgenerator").hide();
	$("#bulkgenerater").hide();
}
function generateSingleWallet(){
    var password = $("#ethgenpassword").val();
    if(password==""){
        alert("Your forgot the password");
        return;
    }
    $("#generatedWallet").show();
    var acc = new Accounts();
    var newAccountEnc = acc.new(password);
    $("#address").val(newAccountEnc.address);
    var newAccountUnEnc = acc.get(newAccountEnc.address, password);
    $("#privkey").val(newAccountUnEnc.private);
    $("#qrcodeAdd").empty();
    new QRCode($("#qrcodeAdd")[0], {
        text: newAccountEnc.address,
        width: $("#qrcode").width(),
        height: $("#qrcode").width(),
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    $("#qrcode").empty();
    new QRCode($("#qrcode")[0], {
        text: newAccountUnEnc.private,
        width: $("#qrcode").width(),
        height: $("#qrcode").width(),
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    $("#encdownload").unbind();
    $("#encdownload").click(function() {
		downloadFile(JSON.stringify(newAccountEnc), newAccountEnc.address+'-Encrypted.json');
	});
    $("#unencdownload").unbind();
    $("#unencdownload").click(function() {
		downloadFile(JSON.stringify(newAccountUnEnc), newAccountEnc.address+'-Unencrypted.json');
	});
}
function printQRcode() {
    var address = $("#address").val();
    var qrsourceprivkey = $("#qrcode").html();
    var qrsourceadd = $("#qrcodeAdd").html();
    var html = "<h4>Address ("+address+")</h4><br/>"+qrsourceadd+"<h4>Private Key</h4></br>"+qrsourceprivkey;
    var win = window.open("about:blank","_blank");
    win.document.write(html);
    win.focus();
    win.print();
}
function downloadFile( data, fileName, fileType ) {
	var fs = require("fs");
	
	window.frame.openDialog({
		type: 'save',
		title: 'Save...',
		multiSelect: false,
		dirSelect:false,
		acceptTypes: {'JSON':['*.json']},
		initialValue:fileName
	}, function( err , files ) {
	   for(var i=0;i<files.length;i++) {
		  fs.writeFile(files[0], data, function(err) {
			if (err) throw err;
		  });
	   }
	});
}