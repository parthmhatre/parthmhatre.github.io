(function($) {
	$.multiInput = {
		defaults: {
			max: 10,
			min: 1,
			prepopulate: []
		}
	};

	$.fn.multiInput = function(config, fileNames) {

		var config = $.extend({}, $.multiInput.defaults, config);

		$this = $(this);

		$this.addClass('OSF');	
			
		$this.wrap("<div>"); //wraping in <div>
		$this.parent().addClass('multi-field-container'); //giving div a class
		
		$this.wrap("<div>");
		$this.parent().addClass('single-multi-field-box');

		config.mainContainer = $this.parent().parent();
		config.multiDiv = $this.parent();		
		
		// creating add and remove buttons
		$('<a>',{
	    	class: 'remove_multi_input_field btn',
	    	text: '-'
			}).appendTo($this);
			
			
		$('<a>',{
	    	class: 'add_multi_input_field btn',
	    	text: '+'
			}).insertAfter(config.multiDiv);
		

		if(!config.prepopulate.length || config.min<config.prepopulate.length) 

			$(this).minClone(config);
		
		// else{

		// 	if(config.min > config.prepopulate.length)
		// 		for(var x=0; x<config.min; x++)
		// 			$(this).initializationOfPrepopulatedData(config, x);

			else
				// for(var x=0; x<config.prepopulate.length; x++)
					$(this).initializationOfPrepopulatedData(config);
		// }

		var fieldsCounter = config.min;

		config.mainContainer.children('.add_multi_input_field').click(function(){		

		if(fieldsCounter < config.max) 
			{
				$(this).clickAdd(config);
				fieldsCounter++;
			}
		});

		config.mainContainer.find('.remove_multi_input_field').click(function(){
			if(fieldsCounter > config.min) 
			{
				$(this).clickRemove(config);
				fieldsCounter--;
			}
		});
	};

	/* Initialize the number of fields present to match the minimum number specified in the config */

	$.fn.minClone = function(config) {

		$mainFieldDiv = $(this);

		/* Duplicate the main field div */

		for(var i=1; i<config.min; i++)
			$mainFieldDiv.clone(true).insertAfter($mainFieldDiv);
	};
			
	$.fn.clickAdd = function(config) {

		var $lastFieldDiv = config.multiDiv.children().last();

		var $fieldsClone = $lastFieldDiv.clone(true);
		$fieldsClone.find('input').val(null);
		$fieldsClone.insertAfter($lastFieldDiv);
	};
	
	$.fn.clickRemove = function(config) {

		$(this).parent().remove(); 
	};

	$.fn.initializationOfPrepopulatedData = function(config) {
		
		for(var x=0; x<config.prepopulate.length; x++){
			
			if(x==0)
				
				var findInputField = $(this).find('input').val(config.prepopulate[x]);
			
			else
			{
				var $lastFieldDiv = config.multiDiv.children().last();
				var $fieldsClone = $lastFieldDiv.clone(true);
				$fieldsClone.find('input').val(config.prepopulate[x]);
				$fieldsClone.insertAfter($lastFieldDiv);
			}
		}
		
		if(config.min>config.prepopulate.length)
			
			for(var x=0; x<config.min-config.prepopulate.length; x++){

				var $lastFieldDiv = config.multiDiv.children().last();
				var $fieldsClone = $lastFieldDiv.clone(true);
				$fieldsClone.find('input').val(null);
				$fieldsClone.insertAfter($lastFieldDiv);
			
			}

	};

})(jQuery);