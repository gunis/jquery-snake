/* finction - if number is in array of numbers */
function in_array(integer, array) {
	for (i = 0; i < array.length; i++) {
		if(array[i] == integer) {
			return true;
		}
	}
	return false;
}

/* function - if numbers are in two dimensional array */
function in_two_dimensional_array(x, y, array, length) {
	for (i = 0; i < length; i++) {
		if(array[i][0] == x && array[i][1] == y) {
			return true;
		}
	}
	return false;
}

/* function - if numbers are in two dimensional array instead of first array values (x, y) */
function in_two_dimensional_array_body(x, y, array, length) {
	for (i = 1; i < length; i++) {
		if(array[i][0] == x && array[i][1] == y) {
			return true;
		}
	}
	return false;
}

$(document).ready(function(){
	/* speed initialization */
	var speed = 200;
	
	/* level initialization */
	var level = 1;
	
	/* key initialization - right */
	var key = 39;
	
	/* left, top, right, down */
	var keys = new Array(37, 38, 39, 40);
	
	/* snake_body array initialization */
	var snake_body = new Array(100);
	snake_body[0] = new Array(2);
	snake_body[0][0] = 45;
	snake_body[0][1] = 30;
	snake_body[1] = new Array(2);
	snake_body[1][0] = 30;
	snake_body[1][1] = 30;
	snake_body[2] = new Array(2);
	snake_body[2][0] = 15;
	snake_body[2][1] = 30;
	snake_body[3] = new Array(2);
	snake_body[3][0] = 0;
	snake_body[3][1] = 30;
	
	var check_speed_before = 0;
	var check_speed_after = 0;
	
	/* body_length initialization */
	var body_length = 4;
	
	/* food array initialization */
	var food = new Array(1);
	food[0] = new Array(2);
	food[0][0] = 0;
	food[0][1] = 0;
	
	/* points initialization */
	var points = 0;
	
	/* function - if is back move */
	function check_back_move(key_now, last_key) {
		switch(key_now) {
			case 37:
				if (39 == last_key) {
					return true;
				}
				break;
			case 38:
				if (40 == last_key) {
					return true;
				}
				break;
			case 39:
				if (37 == last_key) {
					return true;
				}
				break;
			case 40:
				if (38 == last_key) {
					return true;
				}
				break;
		}
		return false;
	}
	
	/* function - if game over */
	function game_over() {
		$(document).stopTime("timerik");
		$('#play').css('display', 'none');
		$('#pause').css('display', 'none');
		$('#game-over').css('display', 'block');
	}
	
	/* function - if pause */
	function pause() {
		$(document).stopTime("timerik");
		$('#play').css('display', 'inline');
		$('#pause').css('display', 'none');
		$('#pause-info').css('display', 'block');
	}
	
	/* function - if new game */
	function new_game() {
		$('#play').css('display', 'inline');
		$('#pause').css('display', 'none');
		$('#stop').css('display', 'inline');
	}
	
	/* function - if increase speed */
	function increase_speed() {
		speed = speed - 5;
		level++;
		$('#level').html(level);
	}
	
	/* function - adding points (when snake eat food) */
	function add_point() {
		points++;
		$('#points').html(points);
		if (0 == (points % 10)) {
			increase_speed();
		}
	}
	
	/* function - increase snake body */
	function increase_snake_body() {
		snake_body[body_length] = new Array(2);
		snake_body[body_length][0] = snake_body[body_length-1][0];
		snake_body[body_length][1] = snake_body[body_length-1][1];
		body_length++;
		var html_content = $('#playground').html();
		$('#playground').html(html_content+'<div class="snake" id="div'+body_length+'">&nbsp;</div>');
		$('#div'+body_length).css('left', snake_body[body_length-1][0]);
		$('#div'+body_length).css('top', snake_body[body_length-1][1]);
		add_point();
	}
	
	/* function - grow food (generation x,y positions of new food) */
	function grow_food() {
		var rand_no_x = Math.random();
		var food_x = (15 * Math.ceil(rand_no_x * 29));
		var rand_no_y = Math.random();
		var food_y = (15 * Math.ceil(rand_no_y * 29));
		
		if (in_two_dimensional_array(food_x, food_y, snake_body, body_length)) {
			grow_food();
		}
		else {
			increase_snake_body();
			food[0][0] = food_x;
			food[0][1] = food_y;
			$('#food').css('left', food_x);
			$('#food').css('top', food_y);
		}
	}
	
	/* function - eat food */
	function eat_food() {
		grow_food();
	}
	
	/* function - if positions of snake head and food are the same */
	function check_food() {
		if (
			snake_body[0][0] == food[0][0] &&
			snake_body[0][1] == food[0][1]
		) {
			eat_food();
		}
	}
	
	/* function - recalculate snake body */
	function recalculate_snake_body() {
		for (i = (body_length-1); i >= 1; i--) {
			snake_body[i][0] = snake_body[i-1][0];
			snake_body[i][1] = snake_body[i-1][1];
		}
	}
	
	/* function - move snake body */
	function move_snake_body() {
		for (i = (body_length-1); i >= 1; i--) {
			var x = snake_body[i][0]+'px';
			$('#div'+(i+1)).css('left', x);
			var y = snake_body[i][1]+'px';
			$('#div'+(i+1)).css('top', y);
		}
	}
	
	/* function - turn left */
	function turn_left() {
		var value;
		value = snake_body[0][0] - 15;
		if (0 <= value) {
			recalculate_snake_body();
			if (!in_two_dimensional_array_body(value, snake_body[0][1], snake_body, body_length)) {
				move_snake_body();
				snake_body[0][0] = value;
				value = value+'px';
				check_food();
				$('#div1').css('left', value);
			}
			else {
				game_over();
			}
		}
		else {
			game_over();
		}
	}
	
	/* function - turn up */
	function turn_up() {
		var value;
		value = snake_body[0][1] - 15;
		if (0 <= value) {
			recalculate_snake_body();
			if (!in_two_dimensional_array_body(snake_body[0][0], value, snake_body, body_length)) {
				move_snake_body();
				snake_body[0][1] = value;
				value = value+'px';
				check_food();
				$('#div1').css('top', value);
			}
			else {
				game_over();
			}
		}
		else {
			game_over();
		}
	}
	
	/* function - turn right */
	function turn_right() {
		var value;
		value = snake_body[0][0] + 15;
		if (435 >= value) {
			recalculate_snake_body();
			if (!in_two_dimensional_array_body(value, snake_body[0][1], snake_body, body_length)) {
				move_snake_body();
				snake_body[0][0] = value;
				value = value+'px';
				check_food();
				$('#div1').css('left', value);
			}
			else {
				game_over();
			}
		}
		else {
			game_over();
		}
	}
	
	/* function - turn down */
	function turn_down() {
		var value;
		value = snake_body[0][1] + 15;
		if (435 >= value) {
			recalculate_snake_body();
			if (!in_two_dimensional_array_body(snake_body[0][0], value, snake_body, body_length)) {
				move_snake_body();
				snake_body[0][1] = value;
				value = value+'px';
				check_food();
				$('#div1').css('top', value);
			}
			else {
				game_over();
			}
		}
		else {
			game_over();
		}
	}
	
	function refresh() {
		/* stop timer */
		$(document).stopTime("timerik");
		
		/* start timer */
		$(document).everyTime(speed, 'timerik', function() {
			
			check_speed_before = speed;
			
			/* key catching */
			$(document).keydown(function(event) {
				if (in_array(event.keyCode, keys) && !check_back_move(event.keyCode, key) && 1 == check_end) {
					key = event.keyCode;
					check_end = 0;
				}
			});
			
			if (in_array(key, keys)) {
				switch(key) {
					case 37:
						turn_left();
						break;
					case 38:
						turn_up();
						break;
					case 39:
						turn_right();
						break;
					case 40:
						turn_down();
						break;
				}
			}
			
			check_speed_after = speed;
			
			if (check_speed_before != check_speed_after) {
				refresh();
			}
			
			check_end = 1;
		});
	}
	
	/* grow food at the begining */
	grow_food();
	
	/* if click on play button */
	$('#play').click(function(){
		var check_end = 0;
		$('#play').css('display', 'none');
		$('#pause').css('display', 'inline');
		$('#pause-info').css('display', 'none');
		
		refresh();
		
	});
	
	/* if click on pause button */
	$('#pause').click(function(){
		pause();
	});
	
	/* if click on stop button */
	$('#stop').click(function(){
		new_game();
	});
});
