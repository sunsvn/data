function baiduMap(e, t) {
    var n = new BMap.Map(e);
    n.enableScrollWheelZoom();
    n.enableContinuousZoom();
    n.addControl(new BMap.NavigationControl);
    var r = new BMap.Point(116.404, 39.915);
    n.centerAndZoom(r, 14);
    n.addEventListener("click", function(e) { _point = e.point;
        var t = new BMap.Point(_point.lng, _point.lat);
        var r = new BMap.Marker(t);
        var i = "<div style='width:250px;'><p>已标注：(" + _point.lng + "," + _point.lat + ")</p><p>请选择：<label class='checked' for='mapurl'><input type='radio' id='mapurl' name='mapinfo' value='url' checked='checked'/>网址</label><label for='mappoint'><input type='radio' id='mappoint' name='mapinfo' value='point'/>经纬</label><label for='mapaddress'><input type='radio' id='mapaddress' name='mapinfo' value='address'/>地名</label></p></div>";
        n.clearOverlays();
        n.addOverlay(r);
        n.panTo(t);
        var s = new BMap.InfoWindow(i);
        r.openInfoWindow(s);
        setTimeout(function() { o();
            $("input[name='mapinfo']").change(function() { $("#bdmap label").removeClass("checked");
                $(this).filter(":checked").parent().addClass("checked");
                o() }) }, 500) });
    var i = new BMap.Geolocation;
    i.getCurrentPosition(function(e) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var t = new BMap.Marker(e.point);
            n.addOverlay(t);
            n.panTo(e.point) } else {
            var r = new BMap.LocalCity;
            r.get(function(e) {
                var t = e.name;
                n.setCenter(t) }) } }, { enableHighAccuracy: true });
    var s = function(e, t) { $.post("shorturl.php", { url: e }, function(n) { shorturl = n.status == 200 ? n.url : e;
            t(shorturl) }, "json") };
    var o = function(e) {
        var n = "";
        switch ($("input[name='mapinfo']:checked").val()) {
            case "url":
                var r = new BMap.Geocoder;
                r.getLocation(_point, function(e) { n = "http://api.map.baidu.com/marker?location=" + _point.lat + "," + _point.lng + "&title=我的位置&content=" + e.address + "附近&output=html&src=二维码";
                    s(n, function(e) {
                        if (t) { t.changeText(e) } else { $("#map_map").val(e);
                            createPic("map") } }) });
                break;
            case "point":
                n = "GEO:" + _point.lng + "," + _point.lat;
                if (t) { t.changeText(n) } else { $("#map_map").val(n).change();
                    createPic("map") }
                break;
            case "address":
                var r = new BMap.Geocoder;
                r.getLocation(_point, function(e) { n = e.address;
                    if (t) { t.changeText(n) } else { $("#map_map").val(n);
                        createPic("map") } });
                break } } }
var _point = null
