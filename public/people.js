var people = (function(){

		var people = [];

		//cache DOM
		var $el = $('#peopleModule');
		var $button = $el.find('button');
		var $input = $el.find('input');
		var $ul = $el.find('ul');
		var template = $el.find('#people-template').html();

		//bind events
		$button.on('click', addPerson)
		$ul.on('click', 'a.delete', deletePerson)

		_render();

		function _render(){
			$ul.html(Mustache.render(template, {people: people}));
			events.emit("peopleChanged", people.length);
			//stats.setPeople(people.length);
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