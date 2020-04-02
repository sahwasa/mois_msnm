(function init($){
  // navigator
  var $header = $('.header'),
      full_lnb = "full_lnb",
      $nav = $('.nav'),
      $locate = $('.location_list > li'),
      timer,
      delay = 200;

  $nav.on({
    'mouseenter' : function(e){
      clearTimeout(timer);
      timer = setTimeout(function() {
        $header.addClass('lnb_hover');
      }, delay);
    },
    'mouseleave' : function(e){
      clearTimeout(timer);
      timer = setTimeout(function() {
        $header.removeClass('lnb_hover');
      }, delay);
    },
    'click' :  function(){
      $header.removeClass('lnb_hover');
      $header.removeClass(full_lnb);
    }
  });

  $('[toggle_sitemap]').on('click',function(){
    $header.toggleClass(full_lnb);
  })
  $('.content').on('click',function(){
    $header.removeClass(full_lnb);
    resetDoc();
  })

  // locate
  $locate.on('click', function(e){
    e.stopPropagation();
    $(this).toggleClass('on');
		$(this).children('.sub_loc').slideToggle();
  });
  $(document).on('click',function(e){
		e.stopPropagation();
		resetDoc();
  });
	function resetDoc(){    
		$locate.removeClass('on').children('.sub_loc').slideUp();
  }
 
  /* layer_popup */
  var modal= $( "[dataformat='modal']" );
  modal.draggable({
    handle: ".pop_tit",
    cursor: "move",
    containment: "parent",
    scroll:false
   });
  modal.find("[role='btn_close']").on('click',function(e){
    e.preventDefault();
    $(this).parents('.overlay').hide();
    $('html').css('overflow','auto');
  });
 
  var rolePopOpen =$("[openpop]");
    rolePopOpen.on('click',function(){
    var popOverlay = $('#'+$(this).attr('openpop')),
        objHtml = $('html');  
    if(popOverlay.css('display') == 'none'){
      objHtml.css('overflow','hidden');
      popOverlay.show();
    }else{
      objHtml.css('overflow','auto');
    }
  });

  /* fileDeco */
  var filePath = $('[role="filePath"]');
  filePath.val('선택된 파일이 없습니다.');
  $('[role="fileAdd"]').change(function(){
    var fileAdd = $(this);
    fileAdd.parent('.file_wrap').next('[role="filePath"]').val(fileAdd.val());
  });

  // accordion
  $('[role="acc"]').accordion({
    header : "h2",
    collapsible: true,
    heightStyle: "content",
    icons: {
      "header": "ui-icon-plus",
      "activeHeader": "ui-icon-minus"
    }
  });
  
  /*calendar*/
  $.datepicker.setDefaults({
    buttonImageOnly: true,
    showOn: "both",
    buttonImage: "../img/calendar.png",
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    regional : ["ko"],
    dateFormat : "yy-mm-dd"
  });
  $( "[role='datepic']" ).datepicker({
      buttonText: "날짜를 선택해주세요."
  });  
  var from = $( "[role='from']" ).datepicker({
    buttonText: "시작날짜를 선택해주세요.",
    onClose: function( selectedDate ) {
      var getName=$(this).attr('name');
      $("input[name='"+ getName +"'].to").datepicker( "option", "minDate", selectedDate );
    }  
  });
  var to = $( "[role='to']" ).datepicker({
    buttonText: "종료날짜를 선택해주세요.",
    onClose: function( selectedDate ) {
      var getName=$(this).attr('name');
      $("input[name='"+ getName +"'].from").datepicker( "option", "maxDate", selectedDate );
    }
  }); 

  // 기간선택
  var typeP = $('[typePeriod]'),
      typePBtn = $('[name="dType"]');
  typePBtn.each(function(){
  if($(this).prop('checked')) changePeriod($(this).attr('id'));
  });
  typePBtn.on('change',function(){
  var getType = $(this).attr('id');
  changePeriod(getType);
  })
  function changePeriod(getType){
  typeP.hide();
  $('[typePeriod="'+ getType +'"]').show();
  }

  //tab
  var tab_cont = $('.tab_conts .tab_cont'),
      tab_btn = $('.tabs li');
  tab_cont.hide();
  tab_cont.first().show();
  tab_btn.first().addClass('on');

  $('.tabs').on('click','a', function(e){
    e.preventDefault();
    var getId = $(this).prop('href').split('#')[1];
    tab_cont.hide();
    tab_btn.removeClass('on');
    $(this).parent('li').addClass('on');
    $('#'+getId).show();
  });  

  // slectlist evt
  var selList = $('[role="checklist"]'),
      selBtn = selList.find('input'),
      allBtn = $('[role="all"]');    
  selBtn.each(function(){
    if($(this).prop('checked')) $(this).parent('label').addClass('on');
  });
  selBtn.on('change', function(){
    var sel = $(this),
        selP = sel.parents('[role="checklist"]');
      addOn(sel);
      allEvt(selP);
  });
  allBtn.on('change',function(){
    var all = $(this);
    addOn(all);
  })

  function addOn(sel){
    if(sel[0].type === 'radio'){
      sel.parents('.select_list').find('label').removeClass('on');
    }
    (sel.prop('checked')) ?
      sel.parents('label').addClass('on') :
      sel.parents('label').removeClass('on');
  }
  function allEvt(selP){
    var checkLeng = selP.find(':checkbox:checked').length,
        allLeng = selP.find(':checkbox').length,
        thisAll = selP.prev('label').find('[role="all"]');

    if(selP.parent('dl').length > 0){
      thisAll = selP.parents('dl').find('[role="all"]');      
      (checkLeng) ?
      thisAll.prop('checked',true).parents('label').addClass('on'):
      thisAll.prop('checked',false).parents('label').removeClass('on');
    }else{
      (checkLeng === allLeng) ?
      thisAll.prop('checked',true).parents('label').addClass('on') :
      thisAll.prop('checked',false).parents('label').removeClass('on');
    }
  }
  allBtn.on('change',function(){
    var sel = $(this),
        selUl = $(this).parent('label').next('ul'),
        selDl = $(this).parents('dt').next('dd');

    if(sel.prop('checked')){
      selUl.find(':checkbox').prop('checked',true);
      selDl.find(':checkbox').prop('checked',true);
      selUl.find('label').addClass('on');
      selDl.find('label').addClass('on');
    }else{
      selUl.find(':checkbox').prop('checked',false);
      selDl.find(':checkbox').prop('checked',false);
      selUl.find('label').removeClass('on');
      selDl.find('label').removeClass('on');
    }
  });
  var customSelect = $(".custom_select select");    
  customSelect.on({
    change : function(){
      var select_name = $(this).children("option:selected").text();
      $(this).siblings("label").text(select_name);
    }
  })
  $('[role="toggleEvtWrap"]').on('click', '[role="toggle"]',function(e){
    e.preventDefault();
    var cur = $(this).attr('datavalue');
    if($(this).attr('disabled') == 'disabled') return false;
    if(cur == 'on'){
      $(this).attr('datavalue','off');
    }else{
      $(this).attr('datavalue','on');
    }
  })
 
})(jQuery);

function jqgridInit(){
  $('.jq-grid').each(function(){
    var grids=$(this);
    $(this).setGridWidth($(this).parents('.tbl_wrap').width());
  });
}
$(window).on('resize', function() {
  jqgridInit();
});


var myPlayer = $("#jquery_jplayer_1"),
    myPlayerData,
    fixFlash_mp4, // Flag: The m4a and m4v Flash player gives some old currentTime values when changed.
    fixFlash_mp4_id, // Timeout ID used with fixFlash_mp4
    ignore_timeupdate, // Flag used with fixFlash_mp4
    options = {
      ready: function (event) {
        // Hide the volume slider on mobile browsers. ie., They have no effect.
        if(event.jPlayer.status.noVolume) {
          // Add a class and then CSS rules deal with it.
          $(".jp-gui").addClass("jp-no-volume");
        }
        // Determine if Flash is being used and the mp4 media type is supplied. BTW, Supplying both mp3 and mp4 is pointless.
        fixFlash_mp4 = event.jPlayer.flash.used && /m4a|m4v/.test(event.jPlayer.options.supplied);
        // Setup the player with media.
        $(this).jPlayer("setMedia", {
          mp3: "http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
          m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
          oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
        });
      },
      timeupdate: function(event) {
        if(!ignore_timeupdate) {
          myControl.progress.slider("value", event.jPlayer.status.currentPercentAbsolute);
        }
      },
      volumechange: function(event) {
        if(event.jPlayer.options.muted) {
          myControl.volume.slider("value", 0);
        } else {
          myControl.volume.slider("value", event.jPlayer.options.volume);
        }
      },
      swfPath: "../../dist/jplayer",
      supplied: "m4a, oga",
      cssSelectorAncestor: "#jp_container_1",
      wmode: "window",
      keyEnabled: true
    },
    myControl = {
      progress: $(options.cssSelectorAncestor + " .jp-progress-slider"),
      volume: $(options.cssSelectorAncestor + " .jp-volume-slider")
    };

// Instance jPlayer
myPlayer.jPlayer(options);

// A pointer to the jPlayer data object
myPlayerData = myPlayer.data("jPlayer");

// Create the volume slider control
myControl.volume.slider({
  animate: "fast",
  max: 1,
  range: "min",
  step: 0.01,
  value : $.jPlayer.prototype.options.volume,
  slide: function(event, ui) {
  myPlayer.jPlayer("option", "muted", false);
  myPlayer.jPlayer("option", "volume", ui.value);
  }
});
