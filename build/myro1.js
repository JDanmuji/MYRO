"use strict";
var cityData = []
  , filterContinent = "all"
  , videoNum = Math.floor(16 * Math.random()) + 1;
$("#mainVideo").append("<source src=\"/myro_video/MainMovie".concat(videoNum, ".mp4\" type=\"video/mp4\" />")),
$(document).ready(function() {
    // //도시 정렬필터에 onclick 추가;
    // document.getElementById("filterSortPopular").setAttribute('onclick', 'test(1)')
    // document.getElementById("filterSortRecommend").setAttribute('onclick', 'test(2)')
    // document.getElementById("filterSortClimbingUp").setAttribute('onclick', 'test(3)')
    // document.getElementById("filterSortClimbingDown").setAttribute('onclick', 'test(4)')
    // let ua = window.navigator.userAgent;
    // let msie = ua.indexOf("MSIE ");
    // if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // 	alert("Internet explorer는 지원하지 않습니다. 다른 브라우저를 이용해주시기 바랍니다.");
    // }
    //    if ($(window).width() <= 600) {
    //        alert('MYRO는 지도 및 장소 정보를 한 화면에 모두 표시하기 때문에 모바일 화면에서의 사용이 불편합니다. 원활한 사용을 위해서 PC나 태블릿으로의 접속을 권장드립니다.')
    //    }
    $.ajax({
        type: "GET",
        url: headAddress + "/getRouteAndCityCnt",
        success: function success(data) {
            data.routeCnt += "",
            data.cityCnt += "",
            $("#routeCnt").html(data.routeCnt.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")),
            $("#cityCnt").html(data.cityCnt.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"))
        }
    }),
    $.ajax({
        type: "GET",
        url: headAddress + "/getCityListForFirstPage",
        success: function success(data) {
            // console.log(data);
            // console.log(data.selectedCntFromCityList);
            // console.log(data.cityIntroductionTxt);
            // let test;
            //도시 데이터 정리
            for (var mostSelectedCities = data.mostSelectedCities, i = 0; i < data.korCityName.length; i++)
                cityData[i] = {},
                cityData[i].korCityName = data.korCityName[i],
                cityData[i].engCityName = data.engCityName[i],
                cityData[i].selectedCntFromCityList = data.selectedCntFromCityList[i],
                cityData[i].possibleTransportationMode = data.possibleTransportationMode[i],
                cityData[i].otherCityListInfo = data.otherCityListInfo[i],
                cityData[i].nation = data.nation[i],
                cityData[i].coordinate = data.coordinate[i],
                cityData[i].continental = data.continental[i],
                cityData[i].cityIntroductionTxt = data.cityIntroductionTxt[i];
            if (600 >= $(window).width()) {
                //상위 4개 도시만 노출
                for (var topCityListForMobileTxt = "", k = 0; k < mostSelectedCities.length; k++)
                    topCityListForMobileTxt += "\n                                                                <a onclick=\"setSpotModal('".concat(mostSelectedCities[k].engCityName, "')\" href=\"#modal-city-detail\" uk-toggle aria-expanded=\"false\">\n                                                                    <li class=\"popular-card-list\">\n                                                                        <div class=\"popular-card\">\n                                                                            <div class=\"popular-card-image-container\">\n                                                                                <img src=\"myro_image/city/").concat(mostSelectedCities[k].engCityName, ".jpg\" alt=\"image\" class=\"popular-card-image\" width=\"180\" height=\"193\" loading=\"lazy\"/>\n                                                                            </div>\n                                                                            <div class=\"popular-card-bottom-container\">\n                                                                                <div class=\"popular-card-title\">").concat(mostSelectedCities[k].engCityName.toUpperCase(), "</div>\n                                                                                <div class=\"popular-card-subtitle\">").concat(mostSelectedCities[k].korCityName, "</div>\n                                                                            </div>\n                                                                        </div>\n                                                                    </li>\n                                                                </a>");
                //도시그리기 //cityData 전역변수 사용.
                $("#topCityListForMobile").append(topCityListForMobileTxt),
                cityListInMobileWeb(),
                $("#destinationSearchKeyword").click(function() {
                    $("#popularCity").css("display", "none")
                }),
                $("#destinationSearchKeyword").blur(function() {
                    $("#destinationSearchKeyword").val() || $("#popularCity").css("display", "block")
                }),
                $("#destinationSearchKeyword").keyup(function() {
                    $("#popularCity").css("display", "none");
                    var k = $(this).val();
                    $("li[name='cityCardForMobile']").css("display", "none"),
                    $("#cityList > li").css("display", "none");
                    //var temp = $("#cityList > div > input[value]:contains('" + k + "')");
                    var temp = $("li[name='cityCardForMobile'] > input[value*='" + k + "']");
                    $(temp).parent().show(),
                    "" == k && $("li[name='cityCardForMobile']").show(),
                    $("#destinationSearchKeyword").off("scroll touchmove mousewheel")
                }),
                $("#destinationSearchKeyword").on("scroll touchmove mousewheel", function(e) {
                    return e.preventDefault(),
                    e.stopPropagation(),
                    !1
                })
            } else {
                // console.log(sortSelectedCntFromCityList);
                for (var topCityListForWebTxt = "", j = 0; j < mostSelectedCities.length; j++)
                    topCityListForWebTxt += "\n                                              <a class=\"uk-width-1-3\" onclick=\"setSpotModal('".concat(mostSelectedCities[j].engCityName, "')\" href=\"#modal-city-detail\" uk-toggle aria-expanded=\"false\">\n                                                <li>\n                                                  <div class=\"uk-panel\" style=\"width:100%;\">\n                                                      <img style=\"width:100%;\" src=\"myro_image/city/").concat(mostSelectedCities[j].engCityName, ".jpg\" alt=\"cityimage\" loading=\"lazy\"/>\n                                                      <div class=\"main-photo-linear\"></div>\n                                                      <div class=\"uk-position-bottom uk-text-center\" style=\"margin-bottom:8px;\">\n                                                          <h3 uk-slider-parallax=\"x: 100,-100\" style=\"font-family: 'Montserrat'; font-weight: 900;margin-bottom:8px;\">").concat(mostSelectedCities[j].engCityName.toUpperCase(), "</h3>\n                                                          <p uk-slider-parallax=\"x: 200,-200\" style=\"margin-top:0;\">").concat(mostSelectedCities[j].korCityName, "</p>\n                                                      </div>\n                                                  </div>\n                                                </li>\n                                              </a>");
                //상위 도시 그리기
                //전체 도시 그리기
                $("#topCityListForWebPage").append(topCityListForWebTxt),
                cityListInWeb()
            }
            // $('.tabs').tabs();
            $("#destinationSearchKeyword").keyup(function() {
                var k = $(this).val();
                $("#cityList > div").hide();
                //let temp = $("#cityList > div > input[value]:contains('" + k + "')");
                var temp = $("#cityList > div > input[value*='" + k + "']");
                // for (let j = 0; j < engCityName.length; j++) {
                // UIkit.modal(document.getElementById(`#modal-city-detail_idx_${engCityName[j]}`)).hide();
                // console.log($(`#modal-city-detail_idx_${engCityName[j]}`));
                // console.log(engCityName[j])
                // UIkit.modal($(`#modal-city-detail_idx_${engCityName[j]}`)).hide();
                // }
                $(temp).parent().show(),
                "" == k && $("#cityList > div").show(),
                $("#destinationSearchKeyword").off("scroll touchmove mousewheel")
            }),
            $("#destinationSearchKeyword").on("scroll touchmove mousewheel", function(e) {
                return e.preventDefault(),
                e.stopPropagation(),
                !1
            }),
            $("#startbutton").click(function() {
                setTimeout(function() {
                    $("#city").focus()
                }, 100)
            })
        }
    }),
    $.ajax({
        type: "GET",
        url: headAddress + "/getMyro1BlogReview",
        success: function success(res) {
            // console.log(123);
            for (var appendBlogReviewHtml = "<ul class=\"uk-slider-items uk-child-width-1-2@s uk-grid\">", i = 0; i < res.length; i++)
                appendBlogReviewHtml += "\n                <li name=\"getBlog\">\n                    <div class=\"uk-cover-container\" style=\"cursor: pointer\" onclick=\"window.open(window.popup = '".concat(res[i].blog_link, "')\">\n                        <img src=").concat(res[i].img_url.substr(1), " alt=\"image\" loading=\"lazy\" />\n                        <div class=\"uk-overlay-primary uk-position-cover\" style=\"background: rgba(34, 34, 34, 0.3)\"></div>\n                        <div class=\"uk-position-center uk-panel\">\n                            <h3>").concat(res[i].title, "</h3>\n                            <div class=\"main-source-text\">").concat(res[i].blog_name, "</div>\n                        </div>\n                    </div>\n                </li>");
            appendBlogReviewHtml += "</ul>",

            $("#travelReview").prepend(appendBlogReviewHtml)
            
            console.log(res);
        }
    })
});
function start() {
    $("#destinationSearchKeyword").focus(),
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#city").offset().top
    }, 1e3)
}
// 가이드모달(width 600px 이상)
// Get the modal
var modal1 = document.getElementById("id01");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    event.target == modal1 && (modal1.style.display = "none")
}
;
var slideIndex = 1;
showDivs(slideIndex);
function plusDivs(n) {
    showDivs(slideIndex += n)
}
function currentDiv(n) {
    showDivs(slideIndex = n)
}
function showDivs(n) {
    // 유튜브 가이드 영상때문에 필터 안먹어서 임시로 해놓음
    // 유튜브 가이드 영상때문에 필터 안먹어서 임시로 해놓음
    var i, x = document.getElementsByClassName("mySlidesG"), dots = document.getElementsByClassName("demo")
}
$("#filter-bar li").click(function() {
    $("#filter-bar li").removeClass("active"),
    $(this).addClass("active"),
    $("#filter-bar").removeClass().addClass($(this).attr("data-target"))
});
var filterCities = function(area) {
    for (var areaList = ["europe", "asia", "america", "oceania", "africa"], i = 0; i < areaList.length; i++)
        $("[name=" + areaList[i] + "]").addClass("slide-out-bck-center"),
        $("[name=" + areaList[i] + "]").css("display", "none");
    if ("all" == area)
        for (var _i = 0; _i < areaList.length; _i++)
            $("[name=" + areaList[_i] + "]").css("display", ""),
            $("[name=" + areaList[_i] + "]").addClass("slide-in-fwd-center");
    else
        for (var _i2 = 0; _i2 < areaList.length; _i2++)
            area == areaList[_i2] ? ($("[name=" + areaList[_i2] + "]").css("display", ""),
            $("[name=" + areaList[_i2] + "]").addClass("slide-in-fwd-center")) : ($("[name=" + areaList[_i2] + "]").addClass("slide-out-bck-center"),
            $("[name=" + areaList[_i2] + "]").css("display", "none"));
    filterContinent = area
};
function showNoticeMenu_Main() {
    document.getElementById("noticeModal_Main").style.display = "flex"
}
function hideNoticeMenu_Main() {
    document.getElementById("noticeModal_Main").style.display = "none"
}
function showPopupMenu_Main() {
    document.getElementById("popupModal_Main").style.display = "flex"
}
function hidePopupMenu_Main() {
    document.getElementById("popupModal_Main").style.display = "none"
}
// 유튜브 동영상 링크 모달창(테스트)
//function ShowYoutubeInfoPlayList_Modal(i) {
//    
//    $("#InfoPlayList").html("");
//    
//    $.ajax({
//        type: 'GET',
//        url: headAddress + '/getCityListForFirstPage',
//        success: function (data) {
//            let engCityName = data.engCityName;
//            let korCityName = data.korCityName;
//            let otherCityListInfo = data.otherCityListInfo
//            let youtubeMovieInfo1 = engCityName[i].toUpperCase() + '의 쇼핑리스트 (Youtube : 방구석TV)'
//            let youtubeMovieInfo2 = engCityName[i].toUpperCase() + '의 여행 꿀팁 (Youtube : 남자여행 김희준)'
//            let youtubeMovieInfo3 = engCityName[i].toUpperCase() + '의 명소 소개 (Youtube : 방구석TV)'
//            let appendtxt =
//
//                '<ul class="collection with-header">' +
//                '<li class="collection-header" style="text-align: center;">' +
//                '<img src="myro_image/flags/' + otherCityListInfo[i].nation + '.png" alt="flags">' +
//                '<h4 style="margin:5px">' + korCityName[i].split(" ")[0] + '&nbsp;' + engCityName[i].toUpperCase() + '</h4>' +
//                '<hs style="color:#818181">마이로가 추천하는&nbsp;' + engCityName[i].toUpperCase() + '의 여행정보영상 목록입니다.</hs></li>' +
//                '<li class="collection-item">' +
//                '<div>1.&nbsp;' + youtubeMovieInfo1 + '<a href="https://www.youtube.com/results?search_query=' + engCityName[i] + '+%EA%BF%80%ED%8C%81" class="secondary-content"><i class="material-icons" style="color:red">play_circle_filled</i></a></div></li>' +
//                '<li class="collection-item">' +
//                '<div>2.&nbsp;' + youtubeMovieInfo2 + '<a class="secondary-content"><i class="material-icons" style="color:red">play_circle_filled</i></a></div></li>' +
//                '<li class="collection-item">' +
//                '<div>3.&nbsp;' + youtubeMovieInfo3 + '<a class="secondary-content"><i class="material-icons" style="color:red">play_circle_filled</i></a></div></li>' +
//                '</ul>'
//
//            $("#InfoPlayList").append(appendtxt);
//            
//        }
//        
//    });
//    
//    document.getElementById('YoutubeInfoPlayList_Modal').style.display = 'block';
//}
//
//function HideYoutubeInfoPlayList_Modal() {
//    
//    document.getElementById('YoutubeInfoPlayList_Modal').style.display = 'none';
//}
// 가이드모달제어 (LSH)
function openYoutubeGideButton() {
    if (600 < $(window).width()) {
        document.getElementById("id01").style.display = "flex",
        document.getElementById("player").style.display = "block";
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else
        document.getElementById("idm").style.display = "block"
}
function closeYoutubeGideButton() {
    document.getElementById("id01").style.display = "none",
    stopVideo(),
    document.getElementsByTagName("script")[0].remove()
}
function openEventPage() {
    window.open("myro_image/event.jpg")
}
function openEventResultPage() {
    window.open("myro_image/eventResult.jpg")
}
// function getBlog(){
//     let imgSrc = [
//         "https://getuikit.com/docs/images/photo.jpg",
//         "https://getuikit.com/docs/images/light.jpg",
//         "https://getuikit.com/docs/images/dark.jpg",
//         "https://getuikit.com/docs/images/photo2.jpg"
//     ];
//     let blogText = [
//         "2박 3일 제주 여행 필수 코스",
//         "여행 작가가 추천하는 부산 여행",
//         "SNS에서 유명한 서울의 숨겨진 명소",
//         "당일치기로 즐기는 국내 여행 스팟"
//     ];
//     let appendBlogHtml = '';
//     for (let i = 0; i < 4; i++) {
//         appendBlogHtml = appendBlogHtml + `
//                         <li name="getBlog">
//                             <div class="uk-cover-container">
//                                 <a id="getBlog_idx_${i}" onclick="goToBlog(${i})">
//                                     <img src=${imgSrc[i]} alt="image" loading="lazy" />
//                                 </a>
//                                 <div class="uk-position-center uk-panel">
//                                     <h3>${blogText[i]}</h3>
//                                 </div>
//                             </div>
//                         </li>
//                         `
//     }
//     $("#getBlog").append(appendBlogHtml);
//     console.log(appendBlogHtml);
// }
//블로그 링크 걸기 하드코딩
// function goToBlog(_num) {
//     if (_num == 0) {
//         window.open(window.popup = 'https://blog.naver.com/myrocdo/222571294557')
//     }
//     else if (_num == 1) {
//         window.open(window.popup = 'https://blog.naver.com/myrocdo/222577580618')
//     }
//     else if (_num == 2) {
//         window.open(window.popup = 'https://blog.naver.com/myrocdo/222584099492')
//     }
//     else if (_num == 3) {
//         window.open(window.popup = 'https://blog.naver.com/myrocdo/222590010234')
//     }
//     else if (_num == 4) {
//         window.open(window.popup = 'https://blog.naver.com/minhae9191/222491332798')
//     }
//     else if (_num == 5) {
//         window.open(window.popup = 'https://blog.naver.com/63misschoi/222501862288')
//     }
//     else if (_num == 6) {
//         window.open(window.popup = 'https://blog.naver.com/pih870318/222486173746')
//     }
//     else if (_num == 7) {
//         window.open(window.popup = 'https://blog.naver.com/2ndtori/222503555539')
//     }
//     else if (_num == 8) {
//         window.open(window.popup = 'https://blog.naver.com/withdayfly/222504406402')
//     }
//     // else if (_num ==4) {
//     //     window.open(window.popup = 'https://blog.naver.com/skdaksdptn/221588485741')
//     // }
// }
function setSpotModal(_engCityName) {
    $.ajax({
        type: "GET",
        url: headAddress + "/getCityDataForModal",
        data: {
            engCityName: _engCityName
        },
        success: function success(data) {
            document.getElementById("cityBgImageForModal").style.backgroundImage = "url('https://myro.co.krmyro_image/city/".concat(_engCityName, ".jpg')"),
            document.getElementById("engCityNameForModal").innerText = data.engCityName.toUpperCase(),
            document.getElementById("korCityNameForModal").innerText = data.korCityName,
            document.getElementById("cityIntroductionTxtForModal").innerText = data.city_introduction_txt,
            document.getElementById("selectedCntFromCityListForModal").innerText = data.selected_cnt,
            document.getElementById("voltageForModal").innerText = data.voltage,
            data.visa || (data.visa = "-");
            document.getElementById("visaForModal").innerText = data.visa,
            document.getElementById("timeDifferenceForModal").innerText = data.timeDifference + " \uC2DC\uAC04",
            document.getElementById("locationForModal").setAttribute("onclick", "window.location.href='/myro2?city=".concat(_engCityName, "'"))
        }
    })
}
//웹페이지 도시 그리기
function cityListInWeb() {
    for (var appendTxt, i = 0; i < cityData.length; i++) {
        if(cityData[i].nation === "korea") {
            //준영
            // appendTxt = '<div class="uk-width-1-4"><div class="uk-panel"><img src="myro_image/city/' + engCityName[i] + '_new.jpg" alt="" />'
            // + '<div class="uk-position-bottom" style="margin-left:24px;text-align:left;">'
            // + '<h3 uk-slider-parallax="x: 100,-100" class="city-card-title">' + engCityName[i].toUpperCase() + '</h3><div style="color:#fff;margin-bottom:16px;" uk-slider-parallax="x: 200,-200"> ' + korCityName[i] + '</div></div></div></div>';
            appendTxt = "",
            cityData[i].otherCityListInfo.visa || (cityData[i].otherCityListInfo.visa = "-"),
            appendTxt = "\n                    " + "<div class=\"col s12 m6 l3\" name=\"" + cityData[i].otherCityListInfo.continental + "\">" + "<input type=\"hidden\" value=\"" + cityData[i].otherCityListInfo.nation + cityData[i].engCityName + cityData[i].korCityName + "\">" + "<a\n                    onclick=\"setSpotModal('".concat(cityData[i].engCityName, "')\"\n                    style=\"color:inherit!important;text-decoration: none!important;\"\n                    href=\"#modal-city-detail\"\n                    uk-toggle>") + "<div class=\"card city-card-style hoverable z-depth-2\" style=\"margin:0;\">" + (-1 == ["chuncheon", "daejeon", "incheon", "gunsan", "suwon", "gapyeong", "geojetongyeong", "yeongwol", "ulleung", "hawaii", "saipan", "guam"].indexOf(cityData[i].engCityName) ? "" : "<div class=\"ribbon-wrapper-1\"><li class=\"uk-label new-label\">New</li></div>") + "<div class=\"card-image imgbox\">" + "<img src=\"myro_image/city/" + cityData[i].engCityName + ".jpg\" alt=\"city\" loading=\"lazy\">" + "</div>" + "<div class=\"city-card-contents-div\" >" + "<li class=\"city-card-contents-title\">" + "<div class=\"citynamefont\">" + "<b>" + cityData[i].engCityName.toUpperCase() + "</b>" + "<br><h6 class=\"city-card-contents-subtitle\"> " + cityData[i].korCityName + "</h6>" + "</div>" + "</li>" + "</div></div></div>" + "</a\n                >",
            $("#cityList").append(appendTxt),
            "-" == cityData[i].otherCityListInfo.visa && (cityData[i].otherCityListInfo.visa = "")

            
        }
    }
}

//모바일 웹 도시 그리기
function cityListInMobileWeb() {
    //전체 도시 노출
    for (var continentals = [{
        engName: "Asia",
        korName: "\uC544\uC2DC\uC544",
        appendTxt: ""
    }, {
        engName: "Europe",
        korName: "\uC720\uB7FD",
        appendTxt: ""
    }, {
        engName: "America",
        korName: "\uC544\uBA54\uB9AC\uCE74",
        appendTxt: ""
    }, {
        engName: "Oceania",
        korName: "\uC624\uC138\uC544\uB2C8\uC544",
        appendTxt: ""
    }], i = 0; i < continentals.length; i++) {
        continentals[i].appendTxt += "\n                                        <div class=\"main-section-container\" >\n                                            <div class=\"main-section-title-container\">\n                                                <div class=\"main-section-title\">".concat(continentals[i].korName, "</div>\n                                                <div class=\"main-section-title-eng\">").concat(continentals[i].engName, "</div>\n                                            </div>\n                                            <div class=\"uk-position-relative uk-light\" uk-slider=\"finite: true\" tabindex=\"-1\" style=\"margin: 8px 0\">\n                                            <ul class=\"uk-slider-items\">\n                                    ");
        // console.log(otherCityListInfo[5].visa)
        // console.log(otherCityListInfo[5])
        for (var j = 0; j < cityData.length; j++)
            cityData[i].otherCityListInfo.visa || (cityData[i].otherCityListInfo.visa = "-"),
            continentals[i].engName.toLowerCase() == cityData[j].continental && (continentals[i].appendTxt += "\n                                    <li name=\"cityCardForMobile\">\n                                        <input type=\"hidden\" value=\"".concat(cityData[j].otherCityListInfo.nation).concat(cityData[j].engCityName).concat(cityData[j].korCityName, "\">\n                                        <a onclick=\"setSpotModal('").concat(cityData[j].engCityName, "')\" href=\"#modal-city-detail\" uk-toggle aria-expanded=\"false\">\n                                            <div class=\"uk-inline\" style=\" margin: 16px; margin-left: 0\">\n                                                <img class=\"mobile-city-card-image\" src=\"myro_image/city/").concat(cityData[j].engCityName, ".jpg\" alt=\"\" loading=\"lazy\"/>\n                                                <div class=\"filter-city-card-linear\"></div>\n                                                <div class=\"uk-position-bottom filter-city-card-container\">\n                                                    <div class=\"filter-city-card-subtitle\">").concat(cityData[j].korCityName, "</div>\n                                                    <div class=\"filter-city-card-title\">").concat(cityData[j].engCityName.toUpperCase(), "</div>\n                                                </div>\n                                            </div>\n                                        </a>\n                                        <div id=\"modal-city-detail_idx_").concat(cityData[j].engCityName, "\" class=\"uk-flex-top city-info-modal\" uk-modal>\n                                            <div class=\"uk-modal-dialog uk-width-auto uk-margin-auto-vertical\" style=\"max-width: 1400px !important;\">\n                                                <button class=\"uk-modal-close-full uk-close-large\" type=\"button\" uk-close ></button>\n                                                <div class=\"uk-grid-match uk-grid-small\" uk-grid>\n                                                    <div class=\"uk-width-1-3@l\"><div class=\"uk-background-cover\"\n                                                    style=\"background-image: url('https://myro.co.krmyro_image/city/").concat(cityData[j].engCityName, ".jpg');\">\n                                                    </div>\n                                                </div>\n                                                <div class=\"uk-width-2-3@l\"> <div class=\"uk-padding-large\">\n                                                    <h2 style=\"font-family: 'Montserrat'; font-weight: 900;margin-bottom:0;\" >\n                                                    ").concat(cityData[j].engCityName.toUpperCase(), "\n                                                    </h2>\n                                                    <div style=\"font-family: 'Montserrat';font-size:1.2rem\" >\n                                                    ").concat(cityData[j].korCityName.toUpperCase(), "\n                                                    </div>\n                                                    <p class=\"main-city-info-p\">\n                                                    ").concat(cityData[j].cityIntroductionTxt, "\n                                                    </p>\n                                                    <div class=\"uk-child-width-1-4 uk-grid-small uk-text-center\" style=\"margin: 16px 0\" uk-grid>\n                                                        <div class=\"main-city-symbol-container\">\n                                                            <i class=\"material-icons\" style=\"font-size: 32px; margin: 8px\" >person</i>\n                                                            <div class=\"main-city-info-text\">\n                                                            ").concat(cityData[j].selectedCntFromCityList, "\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"main-city-symbol-container\">\n                                                            <i class=\"material-icons\"style=\"font-size: 32px; margin: 8px\">bolt</i>\n                                                            <div class=\"main-city-info-text\">\n                                                                ").concat(cityData[j].otherCityListInfo.voltage, "\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"main-city-symbol-container\">\n                                                            <i class=\"material-icons\" style=\"font-size: 32px; margin: 8px\">language</i>\n                                                            <div class=\"main-city-info-text\">\n                                                                ").concat(cityData[j].otherCityListInfo.visa, "\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"main-city-symbol-container\">\n                                                            <i class=\"material-icons\" style=\"font-size: 32px; margin: 8px\">history</i>\n                                                            <div class=\"main-city-info-text\">\n                                                                ").concat(cityData[j].otherCityListInfo.timeDifference, " \uC2DC\uAC04\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                    <button class=\"uk-button myro-color-button uk-button-large\" onClick=\"window.location.href='/myro2?city=").concat(cityData[j].engCityName, "'\">\uC77C\uC815\uB9CC\uB4E4\uAE30</button>\n                                                </div>\n                                            </div>\n                                        </div></div></div>\n                                    </li>"));
        continentals[i].appendTxt += "\n            </ul>\n        </div>\n        </div>"
    }
    for (var _i3 = 0; _i3 < continentals.length; _i3++)
        $("#continentalAreaForMobile").append(continentals[_i3].appendTxt)
}
function sortByPopular() {
    var sortWord = "selectedCntFromCityList";
    cityData.sort(function(a, b) {
        // 내림차순
        return b[sortWord] - a[sortWord]
    }),
    $("#cityList").html(""),
    document.getElementById("currentSortBtnName").innerHTML = "<div class=\"currentSortBtnNameDiv\">\uC778\uAE30\uC21C<span class=\"material-icons\">arrow_drop_down</span></div>",
    cityListInWeb(),
    filterCities(filterContinent)
}
//추천순  (기본)
function sortByRecommend() {
    $.ajax({
        type: "GET",
        url: headAddress + "/getCityListForFirstPage",
        success: function success(data) {
            //도시 데이터 정리
            for (var i = 0; i < data.korCityName.length; i++)
                cityData[i] = {},
                cityData[i].korCityName = data.korCityName[i],
                cityData[i].engCityName = data.engCityName[i],
                cityData[i].selectedCntFromCityList = data.selectedCntFromCityList[i],
                cityData[i].possibleTransportationMode = data.possibleTransportationMode[i],
                cityData[i].otherCityListInfo = data.otherCityListInfo[i],
                cityData[i].nation = data.nation[i],
                cityData[i].coordinate = data.coordinate[i],
                cityData[i].continental = data.continental[i],
                cityData[i].cityIntroductionTxt = data.cityIntroductionTxt[i];
            $("#cityList").html(""),
            document.getElementById("currentSortBtnName").innerHTML = "<div class=\"currentSortBtnNameDiv\">\uCD94\uCC9C\uC21C<span class=\"material-icons\">arrow_drop_down</span></div>",
            cityListInWeb(),
            filterCities(filterContinent)
        }
    })
}
//한글 이름순 정렬 오름차순
function sortByClimbingUp() {
    cityData.sort(function(a, b) {
        return "\uD64D\uCF69" == a.korCityName || "\uC2F1\uAC00\uD3EC\uB974" == a.korCityName ? a.korCityName.split(" ")[0] < b.korCityName.split(" ")[1] ? -1 : a.korCityName.split(" ")[0] > b.korCityName.split(" ")[1] ? 1 : 0 : "\uD64D\uCF69" == b.korCityName || "\uC2F1\uAC00\uD3EC\uB974" == b.korCityName ? a.korCityName.split(" ")[1] < b.korCityName.split(" ")[0] ? -1 : a.korCityName.split(" ")[1] > b.korCityName.split(" ")[0] ? 1 : 0 : a.korCityName.split(" ")[1] < b.korCityName.split(" ")[1] ? -1 : a.korCityName.split(" ")[1] > b.korCityName.split(" ")[1] ? 1 : 0
    }),
    $("#cityList").html(""),
    document.getElementById("currentSortBtnName").innerHTML = "<div class=\"currentSortBtnNameDiv\">\uC624\uB984\uCC28\uC21C<span class=\"material-icons\">arrow_drop_down</span></div>",
    cityListInWeb(),
    filterCities(filterContinent)
}
//한글 이름순 정렬 내림차순
function sortByClimbingDown() {
    // console.log(cityData)
    // console.log(cityData)
    cityData.sort(function(a, b) {
        return "\uD64D\uCF69" == a.korCityName || "\uC2F1\uAC00\uD3EC\uB974" == a.korCityName ? a.korCityName.split(" ")[0] > b.korCityName.split(" ")[1] ? -1 : a.korCityName.split(" ")[0] < b.korCityName.split(" ")[1] ? 1 : 0 : "\uD64D\uCF69" == b.korCityName || "\uC2F1\uAC00\uD3EC\uB974" == b.korCityName ? a.korCityName.split(" ")[1] > b.korCityName.split(" ")[0] ? -1 : a.korCityName.split(" ")[1] < b.korCityName.split(" ")[0] ? 1 : 0 : a.korCityName.split(" ")[1] > b.korCityName.split(" ")[1] ? -1 : a.korCityName.split(" ")[1] < b.korCityName.split(" ")[1] ? 1 : 0
    }),
    $("#cityList").html(""),
    document.getElementById("currentSortBtnName").innerHTML = "<div class=\"currentSortBtnNameDiv\">\uB0B4\uB9BC\uCC28\uC21C<span class=\"material-icons\">arrow_drop_down</span></div>",
    cityListInWeb(),
    filterCities(filterContinent)
}
// //영어 이름순 정렬 오름차순
// function sortByClimbingUp(){
//     cityData.sort(function(a, b) {
//         return a.engCityName < b.engCityName ? -1 : a.engCityName > b.engCityName ? 1 : 0;
//     });
//     $("#cityList").html('');
//     cityListInWeb();
// }
// //영어 이름순 정렬 내림차순
// function sortByClimbingDown(){
//     cityData.sort(function(a, b) {
//         return a.engCityName > b.engCityName ? -1 : a.engCityName > b.engCityName ? 1 : 0;
//     });
//     $("#cityList").html('');
//     cityListInWeb();
// }
