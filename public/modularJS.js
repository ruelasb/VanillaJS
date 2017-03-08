var people = (function(){

		var people = [];

		//cache DOM
		$el = $('#peopleModule');
		$button = $el.find('button');
		$input = $el.find('input');
		$ul = $el.find('ul');
		template = $el.find('#people-template').html();

		//bind events
		$button.on('click', addPerson)
		$ul.on('click', 'a.delete', deletePerson)

		_render();

		function _render(){
			$ul.html(Mustache.render(template, {people: people}));
		}

		function addPerson(value){
			var name = (typeof value === 'string') ? value.trim() : $input.val().trim();
			if (name === ''){return} else if(typeof value === 'object'){ value.preventDefault() };
			people.push(name)
			_render();
			$input.val('');
		}

		function deletePerson(event){
			let i;
			if ( typeof event === 'number'){
				i = event;
			} else {
				event.preventDefault();
				var $remove = $(event.target).closest('li');
				i = $ul.find('li').index($remove);
			}
			people.splice(i, 1);
			_render();
		}

		return {
			addPerson: addPerson,
			deletePerson: deletePerson
		}

})()