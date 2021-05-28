$(window).on('load', function() {
    var wordon, // time word is presented
	    listening = false;
    function getStims(){
		var stims = [];
		$.ajax({
			url: "/pick_trial",
			type: "POST",
			dataType: "json",
			async: false,
			success: function(data){
				for (var i in data){
					stims.push(data[i])
				}
			}
		});
		return stims;
	}
    
    function recordTrialData(folder, object1, object2, response, rt){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'post',
                url: '/record_data',
                data: {
                    folder: folder,
                    object1: object1,
                    object2: object2,
                    response: response,
                    rt: rt
                },
                dataType: 'json',
                success: function(data){
                    console.log(data);
                }
            });
        });
    }

    function finish(){
        $("body").unbind("keydown", response_handler);
        window.location.href("http://www.google.com");
    }

    var stims = getStims();
    var render_img = function(stim) {
		var top_left = "static/datasets/" + stim['folder'] + "/" + stim['object1'] + "/0.png";
        // console.log(top_left)
        var top_right = "static/datasets/" + stim['folder'] + "/" + stim['object1'] + "/1.png";
        var bot_left = "static/datasets/" + stim['folder'] + "/" + stim['object2'] + "/0.png";
        var bot_right = "static/datasets/" + stim['folder'] + "/" + stim['object2'] + "/1.png";
        d3.select("#up-image-grp")
                .append("img")
                .attr("src",top_left)
                .attr("id","img1")
                .style("width","49%")
                .style("flex","49%")
                .style("padding","5px");
        d3.select("#up-image-grp")
                .append("img")
                .attr("src",top_right)
                .attr("id","img2")
                .style("width","49%")
                .style("flex","49%")
                .style("padding","5px");
        d3.select("#down-image-grp")
                .append("img")
                .attr("src",bot_left)
                .attr("id","img3")
                .style("width","49%")
                .style("flex","49%")
                .style("padding","5px");
        d3.select("#down-image-grp")
                .append("img")
                .attr("src",bot_right)
                .attr("id","img4")
                .style("width","49%")
                .style("flex","49%")
                .style("padding","5px");
	};

    var remove_img = function() {
		d3.select("#img1").remove();
		d3.select("#img2").remove();
		d3.select("#img3").remove();
		d3.select("#img4").remove();
	};

    var next = function() {
		if (stims[0].length===0) {
			// console.log(123);
			finish();
		}
		else {
			stim = stims[0].shift();
			// console.log(stim);
			render_img(stim);
            wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Both "A" and "B" have two different translucenct objects.</p><p id="prompt">Which of the pair has larger difference in translucency? Please press &uarr; key for "A" or &darr; key for "B"</p>');
		}
	};

    var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 38:
				response="up";
				break;
			case 40:
				response="down";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			// var hit = response == stim[1];
			var rt = new Date().getTime() - wordon;
			if(response == "up"){
                console.log(stim['folder'],stim['object1'],stim['object2'],stim['object1'],rt);
				recordTrialData(stim['folder'],stim['object1'],stim['object2'],stim['object1'],rt);
			}
			if(response == "down"){
				recordTrialData(stim['folder'],stim['object1'],stim['object2'],stim['object2'],rt);
			}
			remove_img();
			next();
		}
	};

    $("body").focus().keydown(response_handler); 
    next();
});