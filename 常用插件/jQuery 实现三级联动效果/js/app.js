$(function(){ 

  /*******************************************************  
        省 - 市 - 区：效果
  ********************************************************/
  // 获取地区数据并将初始值显示在页面上
  // var datas;
  // var provinces = [];
  // var citys = [];
  // var areas = [];
  // $.ajax({
  //   url:'http://localhost:3000/db',
  //   type:'get',
  //   success:function(res){
  //     datas = res;
  //     // 将所有的“省”存放到provinces数组中;
  //     // 初始化“市”为湖北省中的市;
  //     // 初始化“区”为武汉市中的区;
  //     for(var i=0;i<res.length;i++){
  //       provinces.push(res[i].name);
  //       if(res[i].name == '湖北'){
  //         for(var j=0;j<res[i].city.length;j++){
  //           citys.push(res[i].city[j].name);
  //           if(res[i].city[j].name == '武汉市'){
  //             for(var k=0;k<res[i].city[j].area.length;k++){
  //               areas.push(res[i].city[j].area[k].name);
  //             }
  //           }            
  //         }            
  //       }
  //     }
  //     // 将“省”数据渲染到页面，并默认选中“湖北”
  //     for(var p=0;p<provinces.length;p++){
  //       var pOptions = '<option>'+provinces[p]+'</option>';
  //       if(provinces[p] == '湖北'){
  //         var pOptions = '<option selected>'+provinces[p]+'</option>';
  //       }
  //       $('#provinces').append(pOptions);
  //     }
  //     // 将“市”数据渲染到页面（可以设置默认选中的“市”）
  //     for(var c=0;c<citys.length;c++){
  //       var cOptions = '<option>'+citys[c]+'</option>';
  //       $('#citys').append(cOptions);
  //     }
  //     // 将“区”数据渲染到页面（可以设置默认选中的“区”）
  //     for(var a=0;a<areas.length;a++){
  //       var aOptions = '<option>'+areas[a]+'</option>';
  //       $('#areas').append(aOptions);
  //     }
  //   }
  // });

  // // 点击“省，更换“市”和“区”
  // $('#provinces').change(function(){
  //   citys = [];
  //   $('#citys').html(' ');

  //   var curpText = $('#provinces option:selected').text();  // 获取当前选中的省份值
  //   // 根据当前选中“省”，重新获取对应的“市”数据
  //   for(var i=0;i<datas.length;i++){
  //     if(datas[i].name == curpText){
  //       for(var j=0;j<datas[i].city.length;j++){
  //         citys.push(datas[i].city[j].name);
  //       }
  //     }   
  //   }
  //   // 重新将对应“省”中的“市”显示在页面
  //   for(var c=0;c<citys.length;c++){
  //     var cOptions = '<option>'+citys[c]+'</option>';
  //     $('#citys').append(cOptions);
  //   }
  //   // “市”改变，“区”也跟着改变
  //   changeArea();
  // });

  // // 点击“市”，更换“区”
  // $('#citys').change(function(){
  //   changeArea();
  // });
  // // 由“市”更换“区”函数
  // function changeArea(){
  //   areas = [];
  //   $('#areas').html(' ');

  //   var curpText = $('#provinces option:selected').text();  // 获取当前选中的省份值
  //   var curcText = $('#citys option:selected').text();  // 获取当前选中的城市的值
  //   // 在当前选中“省”情况下，遍历其“市”数据，再根据当前选中的“市”，重新获取对应的“区”数据
  //   for(var i=0;i<datas.length;i++){
  //     if(datas[i].name == curpText){
  //       for(var j=0;j<datas[i].city.length;j++){
  //         if(datas[i].city[j].name == curcText){
  //           for(var k=0;k<datas[i].city[j].area.length;k++){
  //             areas.push(datas[i].city[j].area[k].name);
  //           }
  //         }
  //       }
  //     } 
  //   }
  //   // 重新将对应“市”中的“区”显示在页面
  //   for(var a=0;a<areas.length;a++){
  //     var aOptions = '<option>'+areas[a]+'</option>';
  //     $('#areas').append(aOptions);
  //   }
  // }



  /********************   省 - 市 - 区：效果  ********************/
  // 获取地区数据并将初始值显示在页面上
  var datas;
  var provinces = [];
  var citys = [];
  var areas = [];
  $.ajax({
    url:'area.json',
    type:'get',
    success:function(res){
        datas = res;
        // 将所有的“省”存放到provinces数组中;
        // 初始化“市”为广东省中的市,并存放到citys数组中;
        // 初始化“区”为珠海市中的区,并存放到areas数组中;
        for(var i=0;i<res.length;i++){
          provinces.push(res[i]);
          if(res[i].id == 440000){
            for(var j=0;j<res[i].city.length;j++){
              citys.push(res[i].city[j]);
              if(res[i].city[j].id == 440400){
                for(var k=0;k<res[i].city[j].area.length;k++){
                  areas.push(res[i].city[j].area[k]);
                }
              }
            }
          }
        }
        // 将“省”数据渲染到页面，并默认选中“广东”
        for(var p=0;p<provinces.length;p++){
          var pOptions = '<option value='+provinces[p].id+'>'+provinces[p].name+'</option>';
          if(provinces[p].id == 440000){
            var pOptions = '<option selected value='+provinces[p].id+'>'+provinces[p].name+'</option>';
          }
          $('#provinces').append(pOptions);
        }
        // 将“市”数据渲染到页面,并设置默认选中“珠海市”
        for(var c=0;c<citys.length;c++){
          var cOptions = '<option value='+citys[c].id+'>'+citys[c].name+'</option>';
          if(citys[c].id == 440400){
            var cOptions = '<option selected value='+citys[c].id+'>'+citys[c].name+'</option>';
          }
          $('#citys').append(cOptions);
        }
        // 将“区”数据渲染到页面,并设置默认选中“前山区”
        for(var a=0;a<areas.length;a++){
          var aOptions = '<option value='+areas[a].id+'>'+areas[a].name+'</option>';
          if(areas[a].id == 440404){
            var aOptions = '<option selected value='+areas[a].id+'>'+areas[a].name+'</option>';
          }
          $('#areas').append(aOptions);
        }
    }
  });



  //点击“省，更换“市”和“区”
  $('#provinces').change(function(){
    citys = [];
    $('#citys').html(' ');

    var curpid = $('#provinces option:selected').attr('value');  // 获取当前选中的省份值

    // 根据当前选中“省”，重新获取对应的“市”数据
    for(var i=0;i<datas.length;i++){
      if(datas[i].id == curpid){
        for(var j=0;j<datas[i].city.length;j++){
          citys.push(datas[i].city[j]);
        }
      }
    }
    // 重新将对应“省”中的“市”显示在页面
    for(var c=0;c<citys.length;c++){
      var cOptions = '<option value='+citys[c].id+'>'+citys[c].name+'</option>';
      $('#citys').append(cOptions);
    }
    // “市”改变，“区”也跟着改变
    changeArea();

  });

  // 点击“市”，更换“区”
  $('#citys').change(function(){
    changeArea();
  });
  // 由“市”更换“区”函数
  function changeArea(){
    areas = [];
    $('#areas').html(' ');

    var curpid = $('#provinces option:selected').attr('value');  // 获取当前选中的省份值
    var curcid = $('#citys option:selected').attr('value');  // 获取当前选中的城市的值
    // 在当前选中“省”情况下，遍历其“市”数据，再根据当前选中的“市”，重新获取对应的“区”数据
    for(var i=0;i<datas.length;i++){
      if(datas[i].id == curpid){
        for(var j=0;j<datas[i].city.length;j++){
          if(datas[i].city[j].id == curcid){
            for(var k=0;k<datas[i].city[j].area.length;k++){
              areas.push(datas[i].city[j].area[k]);
            }
          }
        }
      }
    }
    // 重新将对应“市”中的“区”显示在页面
    for(var a=0;a<areas.length;a++){
      var aOptions = '<option value='+areas[a].id+'>'+areas[a].name+'</option>';
      $('#areas').append(aOptions);
    }
  }
})