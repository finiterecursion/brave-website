var LayerSlider = function () {

    return {

        //Layer Slider
        initLayerSlider: function () {
		    $(document).ready(function(){
		        jQuery("#layerslider").layerSlider({
			        skin: 'fullwidth',
			        responsive : true,
                    pauseOnHover : true,
			        responsiveUnder : 960,
			        layersContainer : 960,
                    hideUnder: 480,
                    navButtons: false,
                    navStartStop: false,
			        skinsPath: 'assets/plugins/layer-slider/layerslider/skins/'
			    });
		        jQuery("#layerslidermobile").layerSlider({
			        skin: 'fullwidth',
			        responsive : true,
                    pauseOnHover : true,
			        responsiveUnder : 960,
			        layersContainer : 960,
                    hideOver: 480,
                    navButtons: false,
                    navStartStop: false,
			        skinsPath: 'assets/plugins/layer-slider/layerslider/skins/'
			    });
		    });     
        }

    };
}();        