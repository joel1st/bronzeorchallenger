(function($){
	function renderTemplate(data, id){
		var template = Handlebars.compile($('#vote-template').html());
		$(".voting."+id).html( template(data) );
	}
	function submitVote(league, id){
		var resObj = {
			videoId:id,
			league:league
		};
		$.post("/vote", resObj)
		  .done(function( data ) {
		  	data.votePercent = data.bronzeVotes/data.totalVotes * 100;
		  	data.voteMatch = data.voted === data.league;
		  	renderTemplate(data, id);
		});
	}

	$(".voter").on('click', function(e){
		$this = $(this);
		submitVote($this.data('league'), $this.data('id'));
	});

})(jQuery);