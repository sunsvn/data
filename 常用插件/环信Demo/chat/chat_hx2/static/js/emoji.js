var  Emoji = {
        path: 'static/img/faces/', 
        map: {
            '[):]': 'ee_1.png',
            '[:D]': 'ee_2.png',
            '[;)]': 'ee_3.png',
            '[:-o]': 'ee_4.png',
            '[:p]': 'ee_5.png',
            '[(H)]': 'ee_6.png',
            '[:@]': 'ee_7.png',
            '[:s]': 'ee_8.png',
            '[:$]': 'ee_9.png',
            '[:(]': 'ee_10.png',
            '[:\'(]': 'ee_11.png',
            '[:|]': 'ee_12.png',
            '[(a)]': 'ee_13.png',
            '[8o|]': 'ee_14.png',
            '[8-|]': 'ee_15.png',
            '[+o(]': 'ee_16.png',
            '[<o)]': 'ee_17.png',
            '[|-)]': 'ee_18.png',
            '[*-)]': 'ee_19.png',
            '[:-#]': 'ee_20.png',
            '[:-*]': 'ee_21.png',
            '[^o)]': 'ee_22.png',
            '[8-)]': 'ee_23.png',
            '[(|)]': 'ee_24.png',
            '[(u)]': 'ee_25.png',
            '[(S)]': 'ee_26.png',
            '[(*)]': 'ee_27.png',
            '[(#)]': 'ee_28.png',
            '[(R)]': 'ee_29.png',
            '[({)]': 'ee_30.png',
            '[(})]': 'ee_31.png',
            '[(k)]': 'ee_32.png',
            '[(F)]': 'ee_33.png',
            '[(W)]': 'ee_34.png',
            '[(D)]': 'ee_35.png'
        }
    };
 $(".em-bar-emoji").click(function  () {
    $(".em-bar-emoji-container").html("");
   $(".em-bar-emoji-wrapper").toggleClass("hide");
   var emojili = [];
  $.each(Emoji.map,function(i,n){
     emojili.push("<div class='em-bar-emoji-bg e-face'>"+
          "<img class='e-face emoji' src='static/img/faces/"+n+"' data-value='"+i+"'>"+
        "</div>")
  })

  $(".em-bar-emoji-container").append(
        "<li class='e-face'>"+
              emojili.slice(0,7).join('')+
            "</li>"
      )
  $(".em-bar-emoji-container").append(
        "<li class='e-face'>"+
              emojili.slice(7,14).join('')+
            "</li>"
      )
  $(".em-bar-emoji-container").append(
        "<li class='e-face'>"+
              emojili.slice(14,21).join('')+
            "</li>"
      )
  $(".em-bar-emoji-container").append(
        "<li class='e-face'>"+
              emojili.slice(21,28).join('')+
            "</li>"
      )
  $(".em-bar-emoji-container").append(
        "<li class='e-face'>"+
              emojili.slice(28,35).join('')+
            "</li>"
      ) 
   
 })
 $(".em-widget-textarea").click(function  () {
   $(".em-bar-emoji-wrapper").addClass("hide");
 })
 $(document).on('click','.em-bar-emoji-bg',function(){  
        var text = $(".em-widget-textarea").val();
        text = text + $(this).find("img").attr("data-value");
        $(".em-widget-textarea").val(text);
    });




 