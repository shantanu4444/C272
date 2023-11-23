$(function () {
    var syncClient;
    var syncStream;
    var message = document.getElementById('message');
    var text_area = document.getElementById('text_area');
    var select_element = document.getElementById('select')
    var background_color;


    $.getJSON('/token', function(tokenResponse) {
        syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'info' });

        // create the stream object
        syncClient.stream('messageData').then(function(stream) {
            syncStream = stream;
            // listen update and sync drawing data
            syncStream.on('messagePublished', function(event) {
                console.log('syncStream:',event.message.value);
                syncDrawingData(event.message.value);


            });
        });
    });
    // Write the code here
    function syncDrawingData(data) {
        document.getElementById('text_area').value = data.textarea_value

        if(data.textarea_color == "#FEFAE0"){
            document.getElementById("text_area").style.backgroundColor = "#FEFAE0"
        }

        if(data.textarea_color == "#FA7070"){
            document.getElementById("text_area").style.backgroundColor = "#FA7070"
        }

        if(data.textarea_color == "#EEF296"){
            document.getElementById("text_area").style.backgroundColor = "#EEF296"
        }

        if(data.textarea_color == "#9ADE7B"){
            document.getElementById("text_area").style.backgroundColor = "#9ADE7B"
        }

    }


    function messageSync()
{
	text = document.getElementById("text_area").value;

    setTimeout(function(){
        SettingSyncData()
        },
        1700);

}
    // Write the code here
    function SettingSyncData(){
    syncStream.publishMessage({ 
            textarea_color:background_color,
            textarea_value:text
        });
    }
    // Write the code here
    function select_color(){
        selected_color = document.getElementById("select").value
        console.log(selected_color)
        
        if(selected_color == "white"){
            background_color = "#FEFAE0"
        }

        if(selected_color == "red"){
            background_color = "#FA7070"
        }
        if(selected_color == "yellow"){
            background_color = "#EEF296"
        }
        if(selected_color == "green"){
            background_color = "#9ADE7B"
        }

    }
    // Write the code here
    text_area.addEventListener("keyup", messageSync) 
    select_element.addEventListener("change" , select_color)
    

});
