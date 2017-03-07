(function(){

	var people = {
		people: [],
		init: function(){
			this.cacheDom();
			this.bindEvents();
			this.render();
		},
		cacheDom: function(){
			this.$el = $('#peopleModule');
			this.$button = this.$el.find('button');
			this.$input = this.$el.find('input');
			this.$ul = this.$el.find('ul');
			this.template = this.$el.find('#people-template').html();
		},
		bindEvents: function(){
			this.$button.on('click', this.addPerson.bind(this))
			this.$ul.on('click', 'a.delete', this.deletePerson.bind(this))
		},
		render: function(){
			var data = {
				people: this.people,
			};
			this.$ul.html(Mustache.render(this.template, data));
		},
		addPerson: function(e){
			e.preventDefault();
			const val = this.$input.val();
			if (val === '') {return}; 
			this.people.push(val)
			this.render();
			this.$input.val('');
		},
		deletePerson: function(e){
			e.preventDefault();
			var $remove = $(e.target).closest('li');
			var i = this.$ul.find('li').index($remove);

			this.people.splice(i, 1);
			this.render();
		}
	};

	people.init();

})()