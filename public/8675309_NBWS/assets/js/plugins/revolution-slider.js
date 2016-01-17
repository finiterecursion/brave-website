var RevolutionSlider = function() {

  return {

    //Revolution Slider - Full Screen
    initRSfullScreen: function() {
      var revapi;
      jQuery(document).ready(function() {
        revapi = jQuery('.fullscreenbanner').revolution(
          {
            touchenabled:"off",
//            delay: 15000,
            startwidth: 1170,
            startheight: 500,
            hideThumbs: 10,
            fullWidth: "off",
            forceFullWidth:"on",
            fullScreen: "off",
            hideCaptionAtLimit:650,
            hideAllCaptionAtLimit:400,
            dottedOverlay: "twoxtwo",
            navigationStyle: "preview4",
//            fullScreenOffsetContainer: "#footer",
          });
      });
    }

  };
}();
