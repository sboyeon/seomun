window.onload = function () {
    var elm = ".scroll";
    $(elm).each(function (index) {
      // 개별적으로 Wheel 이벤트 적용
      $(this).on("mousewheel DOMMouseScroll", function (e) {
        e.preventDefault();
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {
          delta = event.wheelDelta / 120;
          if (window.opera) delta = -delta;
        }
        else if (event.detail)
          delta = -event.detail / 3;
        var moveTop = $(window).scrollTop();
        var elmSelecter = $(elm).eq(index); 
        // 박스 상단위치
        var boxArr = [];
        $(".scroll").each(function () {
          boxArr.push($(this).offset().top);
        }); 
        // 마우스휠을 위에서 아래로
        if (delta < 0) {
          for (var i = 0; i < boxArr.length; i++) {
            if (boxArr[i] > moveTop + 1) {
              moveTop = boxArr[i];
              i = boxArr.length;
            }
          }
          // 마우스휠을 아래에서 위로
        } else if (delta > 0) {
          for (var i = boxArr.length - 1; i >= 0; i--) {
            if (boxArr[i] < moveTop - 1) {
              moveTop = boxArr[i];
              i = -1;
            }
          }
        } 
        // 화면 이동 0.7초
        $("html,body").stop().animate({
          scrollTop: moveTop + 'px'
        }, {
          duration: 700, complete: function () {
          }
        });
      });
    });
  }